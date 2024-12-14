from pydantic import BaseModel

class Features(BaseModel):
    type:int
    amount:int
    oldbalanceOrg:int
    newbalanceOrig:int