from fastapi import APIRouter, Depends, HTTPException
from models.userModelDB import UserDB
from models.userModelAPI import UserAPI
from sqlalchemy.orm import Session
from database.db import get_db
import hashlib
from datetime import datetime

router=APIRouter(prefix="/user",tags=["Users"])

@router.post("/login")
def userLogin(user : UserAPI, db : Session = Depends(get_db)):
    companyname=user.companyname
    password=user.password
    api_key=user.api_key
    userFound=db.query(UserDB).filter(UserDB.companyname==companyname).first()
    
    if userFound:
        hashPass=hashlib.sha256()
        hashPass.update(password.encode("utf-8"))
        password=hashPass.hexdigest()

        if password==userFound.password :
            return userFound
        else:
            raise HTTPException(status_code=500, detail="Wrong Password")
        
    else:
        raise HTTPException(status_code=500, detail="User Not Found")

@router.post("/register")
def userRegister(user : UserAPI, db : Session = Depends(get_db)):
    companyname=user.companyname
    password=user.password
    api_key=user.api_key
    print(f"Before = {companyname} : {password} : {api_key}")

    userExists=db.query(UserDB).filter(UserDB.companyname==companyname).first()

    if userExists:
        raise HTTPException(status_code=500, detail="User Already Exists")
    else:
        time=datetime.now()
        timestr=time.strftime("%Y-%m-%d_%H:%M:%S")
        string=companyname+password+timestr

        hashKey=hashlib.sha256()
        hashPass=hashlib.sha256()

        hashKey.update(string.encode("utf-8"))
        api_key=hashKey.hexdigest()

        hashPass.update(password.encode("utf-8"))
        password=hashPass.hexdigest()
        print(f"After = {companyname} : {password} : {api_key}")

        newUser=UserDB(companyname=companyname, password=password, api_key=api_key)
        db.add(newUser)
        db.commit()
        db.refresh(newUser)
        return newUser