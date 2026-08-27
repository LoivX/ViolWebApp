from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import clienti
from app.routers import articoli

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clienti.router)
app.include_router(articoli.router)