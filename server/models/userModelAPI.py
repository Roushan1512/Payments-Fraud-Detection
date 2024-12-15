from pydantic import BaseModel

class UserAPI(BaseModel):
    companyname:str
    password:str
    api_key:str