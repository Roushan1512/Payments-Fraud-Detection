from pydantic import BaseModel

class Features(BaseModel):
    type:int
    amount:int
    oldBal:int
    newBal:int