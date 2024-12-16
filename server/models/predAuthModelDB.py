from sqlalchemy import Column, String, Integer
from database.db import Base

class predAuthDB(Base):
    __tablename__="allTransactions"
    type=Column(Integer)
    amount=Column(Integer)
    oldBal=Column(Integer)
    newBal=Column(Integer)
    companyname=Column(String(255), primary_key=True)
    username=Column(String(255))
    time=Column(String(255))
    date=Column(String(255))
    isFraud=Column(String(255))