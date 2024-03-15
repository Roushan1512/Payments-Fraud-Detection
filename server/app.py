import functools
import pickle
from flask import Flask, request, app, jsonify, url_for, render_template
import numpy as np
import pandas as pd
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

# app related configurations
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:sahilraja2002@localhost:5432/Cypher_transaction'
app.config['JWT_SECRET_KEY'] = 'super-secret'


CORS(app)
db = SQLAlchemy(app)
api = Api(app)
jwt = JWTManager(app)


class UserApiKey(db.Model):
    __tablename__ = 'allApiKey'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    apikey = db.Column(db.String(500))


class AllTransaction(db.Model):
    __tablename__ = 'allTransaction'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    oldbalanceOrg = db.Column(db.Float, nullable=False)
    newbalanceOrig = db.Column(db.Float, nullable=False)
    isFraud = db.Column(db.String(50), nullable=False)
    isFlaggedFraud = db.Column(db.Integer)
    username = db.Column(db.String(100), nullable=False)
    companyName = db.Column(db.String(100))
    time = db.Column(db.String(100))
    Date = db.Column(db.String(100))


with app.app_context():
    db.create_all()


class userApiRegister(Resource):
    def post(self):
        username = request.json['username']
        password = request.json['password']
        apikey = create_access_token(identity=username)
        new_userApiKey = UserApiKey(
            username=username, password=password, apikey=apikey)
        db.session.add(new_userApiKey)
        db.session.commit()
        return {'username': username, 'password': password, 'api_key': apikey, 'message': 'You Must Store This API Key For Future Use!'}


api.add_resource(userApiRegister, '/APiKey/register')

# Loading the model
RF_model = pickle.load(open('random_forest_model.pkl', 'rb'))


def api_key_required(func):
    @functools.wraps(func)
    def decorated_view(*args, **kwargs):
        if request.method == 'POST':
            api_key = request.headers.get('api-key')
            username = request.headers.get('username')
            if not username:
                return jsonify({'message': 'Missing username in headers (type: username:Your_User_Name)'}), 400
            if not api_key:
                return jsonify({'message': 'Missing API key (type: api-key:your_api_key)'}), 400

            if api_key and UserApiKey.query.filter_by(apikey=api_key, username=username).first():
                return func(*args, **kwargs)
            else:
                return jsonify({'message': 'Invalid API key'}), 401
        return func(*args, **kwargs)
    return decorated_view


@app.route('/api/check', methods=['POST'])
# @jwt_required()
@api_key_required
def check():
    return jsonify({'message': 'API is working'})

# This is the main  part of the website where the model is used to predict the data and the data is stored in the database


@app.route('/predict_api', methods=['POST'])
@api_key_required
def predict_api():
    try:
        data = request.json['data']

        if not isinstance(data, list):
            return jsonify({'error': 'Invalid input data. Please provide a list of data points.'}), 400

        predictions = []
        for data_point in data:
            try:
                type, amount, oldbalance_org, newbalance_orig = (
                    data_point['type'],
                    float(data_point['amount']),
                    float(data_point['oldbalanceOrg']),
                    float(data_point['newbalanceOrig']),
                )
                data_unseen = np.array(
                    [type, amount, oldbalance_org, newbalance_orig]).reshape(1, -1)
                prediction = RF_model.predict(data_unseen)[0]
                predictions.append(prediction)

                # Storing the data in the database
                if (prediction == "Fraud"):
                    # query to check if the transaction is already flagged as fraud
                    prev_isFlaggedFraud = AllTransaction.query.filter_by(
                        username=request.headers.get('username')).order_by(AllTransaction.id.desc()).first()
                    prev_isFlaggedFraud = prev_isFlaggedFraud.isFlaggedFraud

                if (prev_isFlaggedFraud == 5):
                    return jsonify({'error': 'Too many Fraud Transaction Your Account is under review'}), 400

                if (prev_isFlaggedFraud > 4):
                    print(prev_isFlaggedFraud)
                    return jsonify({'error': 'You have already made 5 fraud transactions. You are not allowed to make more fraud transactions.'}), 400

                if (prev_isFlaggedFraud == None):
                    prev_isFlaggedFraud = 0

                new_transaction = AllTransaction(
                    type=type, amount=amount, oldbalanceOrg=oldbalance_org, newbalanceOrig=newbalance_orig, isFraud=prediction, isFlaggedFraud=prev_isFlaggedFraud+1,
                    username=request.headers.get('username'), companyName=request.headers.get('companyname'), time=request.headers.get('time'), Date=request.headers.get('date'))
                db.session.add(new_transaction)
                db.session.commit()
            except (KeyError, ValueError) as e:
                return jsonify({'error': f'Invalid data for point: {data_point}. {str(e)}'}), 400
        # Return all predictions as a list
        return jsonify({'predictions': predictions})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# In the front page of the website anyone can use this to check the model
@app.route('/demo/singleData/predict_api', methods=['POST'])
def demo_predict_api():
    try:
        data = request.json['data']
        # print(data)
        type, amount, oldbalance_org, newbalance_orig = data['type'], data[
            'amount'], data['oldbalanceOrg'], data['newbalanceOrig']
        # print(type, amount, oldbalance_org, newbalance_orig)
        try:
            type = type  # Assuming 'type' is a numerical feature
            amount = float(amount)
            oldbalance_org = float(oldbalance_org)
            newbalance_orig = float(newbalance_orig)
        except ValueError:
            return jsonify({'error': 'Invalid data types. Please ensure numerical values for all features.'}), 400
        data_unseen = np.array(
            [type, amount, oldbalance_org, newbalance_orig]).reshape(1, -1)
        output = RF_model.predict(data_unseen)[0]

        return jsonify({'prediction': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

# Sample data
# features=[type,amount,oldbalanceOrg,newbalanceOrig]
# "CASH_OUT":1,"PAYMENT":2,"CASH_IN":3,"TRANSFER":4,"DEBIT":5
