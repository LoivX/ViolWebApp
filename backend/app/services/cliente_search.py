import re
from rapidfuzz import fuzz

def normalizza_testo(testo: str) -> str:
    testo = testo.upper()
    testo = re.sub(r"[^A-Z0-9.]+", " ", testo)

    return " ".join(testo.split())

def calcola_punteggio(
    ricerca: str,
    nome: str,
    codice: str,
) -> float:

    parole_ricerca = ricerca.split()
    parole_nome = nome.split()

    if not parole_ricerca or not parole_nome:
        return 0

    punteggi_parole = []

    for parola_ricerca in parole_ricerca:

        miglior_match = 0

        for parola_nome in parole_nome:

            punteggio = fuzz.ratio(
                parola_ricerca,
                parola_nome,
            )

            miglior_match = max(
                miglior_match,
                punteggio,
            )

        punteggi_parole.append(
            miglior_match
        )

    punteggio_nome = (
        sum(punteggi_parole)
        / len(punteggi_parole)
    )

    parole_trovate = sum(
        punteggio >= 70
        for punteggio in punteggi_parole
    )

    copertura = (
        parole_trovate
        / len(parole_ricerca)
    )

    punteggio_codice = fuzz.partial_ratio(
        ricerca,
        codice,
    )

    return (
        punteggio_nome * 0.70
        + copertura * 100 * 0.25
        + punteggio_codice * 0.05
    )