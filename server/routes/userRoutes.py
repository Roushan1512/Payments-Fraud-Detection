from fastapi import APIRouter
from models.userModelDB import UserDB
from models.userModelAPI import UserAPI
import hashlib
from datetime import datetime

router=APIRouter(prefix="/user",tags=["Users"])

@router.post("/login")
def userLogin(user : UserAPI):
    print(user)
    companyname=user.companyname
    password=user.password
    api_key="user.api_keyIsnotknown"
    return UserDB(companyname=companyname, password=password, api_key=api_key)