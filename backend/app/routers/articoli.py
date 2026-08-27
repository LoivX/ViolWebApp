from fastapi import APIRouter
from app.services.articolo_service import cerca_articoli


router = APIRouter(
    prefix="/api/articoli",
    tags=["Articoli"]
)


@router.get("/cerca")
def cerca_articolo(q: str):
    risultati = cerca_articoli(q)

    return risultati