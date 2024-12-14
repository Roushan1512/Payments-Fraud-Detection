from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from models.predModel import Features
import pickle
import os

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)

path=os.path.dirname(__file__)
dTree=pickle.load(open(path+"/predictions/decisionTreeModel.pkl","rb"))

@app.get("/")
def home():
    return "Home Page"

@app.post("/predict/noauth")
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


if (__name__=="__main__"):
    uvicorn.run("server:app",reload=True,port=8000)