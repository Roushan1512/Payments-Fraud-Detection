from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)

@app.get("/")
def home():
    return "Home Page"

if (__name__=="__main__"):
    uvicorn.run("server:app",reload=True,port=8000)