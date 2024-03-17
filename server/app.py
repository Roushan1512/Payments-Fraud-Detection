import os
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
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://cypheralldetails_user:CAPmoZmvLCbmoEOW1ZDRXhGuSAvUZZsy@dpg-cnqivtmd3nmc7393uabg-a.singapore-postgres.render.com/cypheralldetails"
app.config['JWT_SECRET_KEY'] = 'super-secret'


CORS(app)
db = SQLAlchemy(app)
api = Api(app)
jwt = JWTManager(app)


class UserApiKey(db.Model):
    __tablename__ = 'allApiKey'
    id = db.Column(db.Integer, primary_key=True)
    companyname = db.Column(db.String(100), unique=True)
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
        companyname = request.json['companyname']
        password = request.json['password']
        apikey = create_access_token(identity=companyname)
        new_userApiKey = UserApiKey(
            companyname=companyname, password=password, apikey=apikey)
        db.session.add(new_userApiKey)
        db.session.commit()
        return jsonify({'companyname': companyname, 'password': password, 'api_key': apikey, 'message': 'You Must Store This API Key For Future Use!'})


api.add_resource(userApiRegister, '/APiKey/register')

# Loading the model
RF_model = pickle.load(open('random_forest_model.pkl', 'rb'))


@app.route('/api/login', methods=['POST'])
def loginapi():
    companyname = request.json['companyname']
    password = request.json['password']
    user = UserApiKey.query.filter_by(
        companyname=companyname, password=password).first()
    return jsonify({'message': 'Logged in successfully', 'api_key': user.apikey, 'companyname': user.companyname, 'password': user.password}), 200


def api_key_required(func):
    @functools.wraps(func)
    def decorated_view(*args, **kwargs):
        if request.method == 'POST':
            api_key = request.headers.get('api-key')
            companyname = request.headers.get('companyname')
            if not companyname:
                return jsonify({'message': 'Missing username in headers (type: companyname:Your_User_Name)'}), 400
            if not api_key:
                return jsonify({'message': 'Missing API key (type: api-key:your_api_key)'}), 400

            if api_key and UserApiKey.query.filter_by(apikey=api_key, companyname=companyname).first():
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

                print(prediction)

                # Storing the data in the database
                if (prediction == "Fraud"):
                    # query to check if the transaction is already flagged as fraud
                    prev_isFlaggedFraud = AllTransaction.query.filter_by(
                        username=request.headers.get('username')).order_by(AllTransaction.id.desc()).first()
                    print(prev_isFlaggedFraud)

                    if prev_isFlaggedFraud:
                        prev_isFlaggedFraud = prev_isFlaggedFraud.isFlaggedFraud
                        if (prev_isFlaggedFraud == 5):
                            return jsonify({'error': 'Too many Fraud Transaction Your Account is under review'}), 400

                        if (prev_isFlaggedFraud > 4):
                            print(prev_isFlaggedFraud)
                            return jsonify({'error': 'You have already made 5 fraud transactions. You are not allowed to make more fraud transactions.'}), 400
                    else:
                        prev_isFlaggedFraud = 0
                else:
                    prev_isFlaggedFraud = -1

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
@app.route('/demo/singleData/predict_noapi', methods=['POST'])
def predict_noapi():
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


@app.route('/getFrauds', methods=['POST'])
def getFrauds():
    data = request.json['data']
    company_name = data['companyName']
    frauds = AllTransaction.query.filter_by(
        isFraud="Fraud", companyName=company_name).all()  # Fraud and No Fraud
    nofrauds = AllTransaction.query.filter_by(
        isFraud="No Fraud", companyName=company_name).all()
    transactions = AllTransaction.query.filter_by(
        companyName=company_name).all()
    flag = AllTransaction.query.filter_by(
        isFlaggedFraud=5, companyName=company_name).all()
    return jsonify({'frauds': len(frauds), 'nofrauds': len(nofrauds), 'transactions': len(transactions), 'flagged': len(flag)})


@app.route('/status', methods=['GET'])
def status():
    return "Main page is working"


if __name__ == '__main__':
    app.run(debug=True)
    print("Server running on port : 5000")

# Sample data
# features=[type,amount,oldbalanceOrg,newbalanceOrig]
# "CASH_OUT":1,"PAYMENT":2,"CASH_IN":3,"TRANSFER":4,"DEBIT":5
