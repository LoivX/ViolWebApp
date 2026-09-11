from app.database import get_connection
from app.services.articolo_search import (
    calcola_punteggio,
    normalizza_testo,
)


QUERY_CERCA_ARTICOLI = """
WITH Articoli AS (
    SELECT
        RTRIM(CODART) AS codice,
        LTRIM(RTRIM(DESART)) +
            CASE
                WHEN LTRIM(RTRIM(CAST(DES_AGG AS VARCHAR(MAX)))) <> '' THEN
                    ' ' + LTRIM(RTRIM(CAST(DES_AGG AS VARCHAR(MAX))))
                ELSE
                    ''
            END AS descrizione
    FROM dbo.EAMANAGRVIOL
    WHERE
        SOSPESO = 'N'
        AND CODART NOT LIKE '0%'
),

ParoleRicerca AS (
    SELECT DISTINCT
        UPPER(LTRIM(RTRIM(value))) AS parola
    FROM STRING_SPLIT(?, ' ')
    WHERE LTRIM(RTRIM(value)) <> ''
),

MigliorMatch AS (
    SELECT
        a.codice,
        a.descrizione,
        pr.parola,

        MAX(
            CASE
                WHEN UPPER(LTRIM(RTRIM(d.value))) = pr.parola
                    THEN 100

                WHEN UPPER(LTRIM(RTRIM(d.value)))
                    LIKE '%' + pr.parola + '%'
                    THEN 90

                WHEN LEN(LTRIM(RTRIM(d.value))) >= 3
                AND pr.parola LIKE '%' + UPPER(LTRIM(RTRIM(d.value))) + '%'
                    THEN 90

                WHEN DIFFERENCE(
                    UPPER(LTRIM(RTRIM(d.value))),
                    pr.parola
                ) = 4
                    THEN 80

                WHEN DIFFERENCE(
                    UPPER(LTRIM(RTRIM(d.value))),
                    pr.parola
                ) = 3
                    THEN 60

                ELSE 0
            END
        ) AS migliorMatch

    FROM Articoli a

    CROSS JOIN ParoleRicerca pr

    CROSS APPLY (
        SELECT value
        FROM STRING_SPLIT(a.descrizione, ' ')
        WHERE LTRIM(RTRIM(value)) <> ''
    ) d

    GROUP BY
        a.codice,
        a.descrizione,
        pr.parola
),

PunteggioArticolo AS (
    SELECT
        codice,
        descrizione,

        SUM(
            CASE
                WHEN migliorMatch >= 60 THEN 1
                ELSE 0
            END
        ) AS paroleTrovate,

        SUM(migliorMatch) AS punteggioSQL

    FROM MigliorMatch

    GROUP BY
        codice,
        descrizione
),

Candidati AS (
    SELECT
        pa.codice,
        pa.descrizione,
        pa.paroleTrovate,
        pa.punteggioSQL,

        CASE
            WHEN UPPER(pa.codice) = UPPER(?)
                THEN 0

            WHEN UPPER(pa.codice) LIKE '%' + UPPER(?) + '%'
                THEN 1

            ELSE 2
        END AS prioritaCodice

    FROM PunteggioArticolo pa

    WHERE
        pa.punteggioSQL > 0

        OR UPPER(pa.codice) = UPPER(?)

        OR UPPER(pa.codice) LIKE '%' + UPPER(?) + '%'
)

SELECT TOP 50
    codice,
    descrizione,
    paroleTrovate,
    punteggioSQL

FROM Candidati

ORDER BY
    prioritaCodice ASC,
    paroleTrovate DESC,
    punteggioSQL DESC;
"""


def cerca_articoli(testo: str):
    ricerca = normalizza_testo(testo)

    if len(ricerca) < 2:
        return []

    connessione = get_connection()
    cursore = connessione.cursor()

    try:
        cursore.execute(
            QUERY_CERCA_ARTICOLI,
            ricerca,
            ricerca,
            ricerca,
            ricerca,
            ricerca,
        )

        risultati = []

        for riga in cursore.fetchall():
            descrizione = riga.descrizione.strip()
            codice = riga.codice.strip()

            punteggio = calcola_punteggio(
                ricerca,
                normalizza_testo(descrizione),
                normalizza_testo(codice),
            )

            risultati.append({
                "codice": codice,
                "descrizione": descrizione,
                "punteggioSQL": riga.punteggioSQL,
                "paroleTrovate": riga.paroleTrovate,
                "_punteggio": punteggio,
            })

    finally:
        cursore.close()
        connessione.close()

    risultati.sort(
        key=lambda articolo: articolo["_punteggio"],
        reverse=True,
    )

    for articolo in risultati:
        del articolo["_punteggio"]

    return risultati