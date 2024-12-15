from database.db import Base
from sqlalchemy import Column, String

class UserDB(Base):
    __tablename__="cypherUsers"
    companyname=Column(String(255), primary_key=True)
    password=Column(String(255))
    api_key=Column(String(255))