from fastapi import APIRouter
from models.predModel import Features
import pickle
import os

path=os.path.dirname(__file__)
path=os.path.join(path,"..","predictions","decisionTreeModel.pkl")
dTree=pickle.load(open(path,"rb"))

router = APIRouter(prefix="/predict",tags=["predictions"])

@router.post("/noauth")
def demo(feature:Features):
    print("Called")
    type=feature.type
    amount=feature.amount
    oldBal=feature.oldBal
    newBal=feature.newBal
    print(type,amount,oldBal,newBal)
    prediction=(dTree.predict([[type,amount,oldBal,newBal]])[0])
    print(prediction)
    return {"prediction" : "Fraud" if prediction==1 else "Not Fraud"}