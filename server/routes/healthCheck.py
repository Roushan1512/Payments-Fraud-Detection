from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.userModelDB import UserDB

router=APIRouter()

@router.get("/pingDB")
def ping_db(db:Session=Depends(get_db)):
    try:
        users=db.query(UserDB).filter().all()
        companies=[i.companyname for i in users]
        return companies
    except Exception as e:
        return "Failed to Connect to DB"