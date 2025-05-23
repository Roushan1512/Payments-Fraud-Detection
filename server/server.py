from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import pickle
from routes.predRoutes import router as predRoutes
from routes.userRoutes import router as userRoutes
from routes.healthCheck import router as healthRoute
from routes.dashboardRoute import router as dashboardRoute

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)
app.include_router(predRoutes)
app.include_router(userRoutes)
app.include_router(healthRoute)
app.include_router(dashboardRoute)

@app.get("/")
def home():
    return "Home Page"


if (__name__=="__main__"):
    uvicorn.run("server:app",reload=True,host="0.0.0.0",port=8000)


# cd server
# python -m venv fraudenv
# fraudenv\Scripts\Activate
# python -m ipykernel install --name=fraudenv --display-name="fraudenv"