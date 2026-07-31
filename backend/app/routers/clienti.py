from fastapi import APIRouter
from app.services.cliente_service import cerca_clienti


router = APIRouter(
    prefix="/api/clienti",
    tags=["Clienti"]
)


@router.get("/cerca")
def cerca_cliente(q: str):
    risultati = cerca_clienti(q)

    return risultati