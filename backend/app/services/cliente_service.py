from app.database import get_connection


def cerca_clienti(testo: str):
    connessione = get_connection()
    cursore = connessione.cursor()

    query = """
        SELECT
            RTRIM(CSOTT) AS codice,
            RTRIM(CODM) AS codiceMnemonico,
            LTRIM(RTRIM(RAG1)) +
                CASE
                    WHEN LTRIM(RTRIM(RAG2)) <> '' THEN
                        ' ' + LTRIM(RTRIM(RAG2))
                    ELSE ''
                END AS nome,
            LTRIM(RTRIM(IND)) + ' ' + LTRIM(RTRIM(LOC)) AS indirizzo
        FROM dbo.EABANCFGVIOL
        WHERE
            TSOTT = 'C'
            AND (
                RTRIM(CSOTT) LIKE ?
                OR RTRIM(CODM) LIKE ?
                OR (
                    LTRIM(RTRIM(RAG1)) +
                    CASE
                        WHEN LTRIM(RTRIM(RAG2)) <> '' THEN
                            ' ' + LTRIM(RTRIM(RAG2))
                        ELSE ''
                    END
                ) LIKE ?
            )
        ORDER BY
            CASE
                WHEN (
                    LTRIM(RTRIM(RAG1)) +
                    CASE
                        WHEN LTRIM(RTRIM(RAG2)) <> '' THEN
                            ' ' + LTRIM(RTRIM(RAG2))
                        ELSE ''
                    END
                ) LIKE ? THEN 0

                WHEN (
                    LTRIM(RTRIM(RAG1)) +
                    CASE
                        WHEN LTRIM(RTRIM(RAG2)) <> '' THEN
                            ' ' + LTRIM(RTRIM(RAG2))
                        ELSE ''
                    END
                ) LIKE ? THEN 1

                ELSE 2
            END,
            RAG1
    """

    ricerca = f"%{testo}%"
    ricerca_inizio = f"{testo}%"
    ricerca_parola = f"% {testo}%"

    cursore.execute(
        query,
        ricerca,
        ricerca,
        ricerca,
        ricerca_inizio,
        ricerca_parola,
    )

    risultati = []

    for riga in cursore.fetchall():
        risultati.append({
            "codice": riga.codice,
            "codiceMnemonico": riga.codiceMnemonico,
            "nome": riga.nome.strip(),
            "indirizzo": riga.indirizzo.strip(),
        })

    cursore.close()
    connessione.close()

    return risultati