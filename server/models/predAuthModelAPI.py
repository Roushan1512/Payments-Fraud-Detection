from pydantic import BaseModel

class predAuthmodelAPI(BaseModel):
    type:int
    amount:int
    oldBal:int
    newBal:int
    api_key:str
    companyname:str
    username:str
    time:str
    date:str