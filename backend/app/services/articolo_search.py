import re

from rapidfuzz import fuzz


def normalizza_testo(testo: str) -> str:
    testo = testo.upper()
    testo = re.sub(r"[^A-Z0-9]+", " ", testo)

    return " ".join(testo.split())


def genera_ngrammi(testo: str, n: int = 2) -> set[str]:
    if len(testo) < n:
        return set()

    return {
        testo[i:i + n]
        for i in range(len(testo) - n + 1)
    }


def similarita_ngrammi(
    testo1: str,
    testo2: str,
) -> float:
    ngrammi1 = genera_ngrammi(testo1)
    ngrammi2 = genera_ngrammi(testo2)

    if not ngrammi1 or not ngrammi2:
        return 0

    intersezione = len(ngrammi1 & ngrammi2)
    unione = len(ngrammi1 | ngrammi2)

    if unione == 0:
        return 0

    return (
        intersezione
        / unione
    ) * 100


def similarita_parola(
    parola_ricerca: str,
    parola_descrizione: str,
) -> float:
    similarita_levenshtein = fuzz.ratio(
        parola_ricerca,
        parola_descrizione,
    )

    similarita_ngram = similarita_ngrammi(
        parola_ricerca,
        parola_descrizione,
    )

    return (
        similarita_levenshtein * 0.70
        + similarita_ngram * 0.30
    )


def calcola_punteggio(
    ricerca: str,
    descrizione: str,
    codice: str,
) -> float:

    parole_ricerca = ricerca.split()
    parole_descrizione = descrizione.split()

    if not parole_ricerca or not parole_descrizione:
        return 0

    punteggi_parole = []

    for parola_ricerca in parole_ricerca:

        miglior_match = 0

        for parola_descrizione in parole_descrizione:

            punteggio = similarita_parola(
                parola_ricerca,
                parola_descrizione,
            )

            miglior_match = max(
                miglior_match,
                punteggio,
            )

        punteggi_parole.append(
            miglior_match
        )

    punteggio_parole = (
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
        punteggio_parole * 0.60
        + copertura * 100 * 0.35
        + punteggio_codice * 0.05
    )