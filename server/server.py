from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from models.predModel import Features

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)

@app.get("/")
def home():
    return "Home Page"

@app.post("/demo/singleData/predict_noapi")
def demo(feature:Features):
    print("Cslled")
    type=feature.type
    amount=feature.amount
    oldBal=feature.oldbalanceOrg
    newBal=feature.newbalanceOrig
    print(type,amount,oldBal,newBal)


if (__name__=="__main__"):
    uvicorn.run("server:app",reload=True,port=8000)