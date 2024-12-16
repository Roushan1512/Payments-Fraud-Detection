from fastapi import APIRouter, Depends, HTTPException
from models.predDemoAPI import Features
from models.predAuthModelAPI import predAuthmodelAPI
from models.predAuthModelDB import predAuthDB
from models.userModelDB import UserDB
from database.db import get_db
from sqlalchemy.orm import Session
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
    prediction=("Fraud" if prediction==1 else "Not Fraud")
    print(prediction)
    return {"prediction" : prediction}

@router.post("/apiKey")
def predApi(predData : predAuthmodelAPI, db : Session = Depends(get_db)):
    type=predData.type
    amount=predData.amount
    oldBal=predData.oldBal
    newBal=predData.newBal
    api_key=predData.api_key
    companyname=predData.companyname
    username=predData.username
    time=predData.time
    date=predData.date
    print(f"{type}\n{amount}\n{oldBal}\n{newBal}\n{api_key}\n{companyname}\n{username}\n{time}\n{date}")

    userFound=db.query(UserDB).filter(UserDB.companyname==companyname).first()
    if not userFound:
        raise HTTPException(status_code=500, detail="User Not Found")
    else:
        if userFound.api_key!=api_key :
            raise HTTPException(status_code=500, detail="Wrong API Key")
        else:
            prediction=(dTree.predict([[type,amount,oldBal,newBal]])[0])
            prediction=("Fraud" if prediction==1 else "Not Fraud")
            print(prediction)
            newTransaction=predAuthDB(
                type=type,
                amount=amount,
                oldBal=oldBal,
                newBal=newBal,
                companyname=companyname,
                username=username,
                time=time,
                date=date,
                isFraud=prediction
            )
            db.add(newTransaction)
            db.commit()
            db.refresh(newTransaction)
            return {"prediction" : prediction}