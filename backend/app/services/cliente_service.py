from app.database import get_connection
from app.services.cliente_search import (
    calcola_punteggio
)

QUERY_CERCA_CLIENTI = """
    WITH Clienti AS (
        SELECT
            RTRIM(CSOTT) AS codice,

            LTRIM(RTRIM(RAG1)) +
                CASE
                    WHEN LTRIM(RTRIM(RAG2)) <> '' THEN
                        ' ' + LTRIM(RTRIM(RAG2))
                    ELSE
                        ''
                END AS nome,

            LTRIM(RTRIM(IND)) + ' ' + LTRIM(RTRIM(LOC)) AS indirizzo

        FROM dbo.EABANCFGVIOL

        WHERE
            TSOTT = 'C'
    ),

    ParoleRicerca AS (
        SELECT DISTINCT
            UPPER(LTRIM(RTRIM(value))) AS parola

        FROM STRING_SPLIT(?, ' ')

        WHERE
            LTRIM(RTRIM(value)) <> ''
    ),

    MigliorMatch AS (
        SELECT
            c.codice,
            c.nome,
            c.indirizzo,
            pr.parola,

            MAX(
                CASE
                    -- Match esatto
                    WHEN UPPER(LTRIM(RTRIM(d.value))) = pr.parola
                        THEN 100

                    -- La parola del cliente contiene quella cercata
                    WHEN UPPER(LTRIM(RTRIM(d.value)))
                        LIKE '%' + pr.parola + '%'
                        THEN 90

                    -- La parola cercata contiene quella del cliente,
                    -- solo se la parola è abbastanza lunga
                    WHEN LEN(LTRIM(RTRIM(d.value))) >= 4
                        AND pr.parola
                            LIKE '%' + UPPER(LTRIM(RTRIM(d.value))) + '%'
                        THEN 80

                    -- Somiglianza fonetica
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

        FROM Clienti c

        CROSS JOIN ParoleRicerca pr

        CROSS APPLY (
            SELECT value
            FROM STRING_SPLIT(c.nome, ' ')
            WHERE LTRIM(RTRIM(value)) <> ''
        ) d

        GROUP BY
            c.codice,
            c.nome,
            c.indirizzo,
            pr.parola
    ),

    PunteggioCliente AS (
        SELECT
            codice,
            nome,
            indirizzo,

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
            nome,
            indirizzo
    )

    SELECT TOP 50
        codice,
        nome,
        indirizzo,
        paroleTrovate,
        punteggioSQL

    FROM PunteggioCliente

    WHERE
        punteggioSQL > 0

    ORDER BY
        paroleTrovate DESC,
        punteggioSQL DESC; 
"""


def cerca_clienti(testo: str):
    ricerca = testo.strip().upper()

    if len(ricerca) < 2:
        return []

    connessione = get_connection()
    cursore = connessione.cursor()

    try:
        cursore.execute(
            QUERY_CERCA_CLIENTI,
            ricerca,
        )

        risultati = []

        risultati = []

        for riga in cursore.fetchall():
            nome = riga.nome.strip()
            codice = riga.codice.strip()
            indirizzo = riga.indirizzo.strip()

            punteggio = calcola_punteggio(
                ricerca,
                nome,
                codice,
            )

            risultati.append({
                "codice": codice,
                "nome": nome,
                "indirizzo": indirizzo,
                "_punteggio": punteggio,
            })

    finally:
        cursore.close()
        connessione.close()

    risultati.sort(
        key=lambda cliente: cliente["_punteggio"],
        reverse=True,
    )

    for cliente in risultati:
        del cliente["_punteggio"]

    return risultati