from fastapi import FastAPI
from api import tsetmc

app = FastAPI()

app.include_router(tsetmc.router)