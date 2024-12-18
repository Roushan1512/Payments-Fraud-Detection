from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.predAuthModelDB import predAuthDB

router=APIRouter()

@router.get("/dashboard/getFrauds")
def get_frauds(companyname:str, db:Session=Depends(get_db)):
    print(companyname)
    txns=db.query(predAuthDB).filter(predAuthDB.companyname==companyname).all()
    print(len(txns))
    return txns