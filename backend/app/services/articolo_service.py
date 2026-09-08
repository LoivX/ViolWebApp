from app.database import get_connection


def cerca_articoli(testo: str):
    connessione = get_connection()
    cursore = connessione.cursor()

    query = """
        SELECT
            RTRIM(CODART) AS codice,
            RTRIM(CODMNEMO) AS codiceMnemonico,
            LTRIM(RTRIM(DESART)) +
                CASE
                    WHEN LTRIM(RTRIM(CAST(DES_AGG AS VARCHAR(MAX)))) <> '' THEN
                        ' ' + LTRIM(RTRIM(CAST(DES_AGG AS VARCHAR(MAX))))
                    ELSE
                        ''
                END AS descrizione,
            RTRIM(UM) AS unitaMisura
        FROM dbo.EAMANAGRVIOL
        WHERE
            SOSPESO = 'N'
            AND CODART NOT LIKE '0%'
            AND (
                RTRIM(CODART) LIKE ?
                OR RTRIM(CODMNEMO) LIKE ?
                OR (
                    LTRIM(RTRIM(DESART)) +
                    CASE
                        WHEN LTRIM(RTRIM(CAST(DES_AGG AS VARCHAR(MAX)))) <> '' THEN
                            ' ' + LTRIM(RTRIM(CAST(DES_AGG AS VARCHAR(MAX))))
                        ELSE
                            ''
                    END
                ) LIKE ? 
            )

        ORDER BY
            CASE
                WHEN RTRIM(CODART) LIKE ? THEN 0
                WHEN RTRIM(CODMNEMO) LIKE ? THEN 1
                WHEN LTRIM(RTRIM(DESART)) LIKE ? THEN 2
                ELSE 3
            END,
            DESART
    """

    ricerca = f"%{testo}%"
    ricerca_inizio = f"{testo}%"

    cursore.execute(
        query,
        ricerca,
        ricerca,
        ricerca,
        ricerca_inizio,
        ricerca_inizio,
        ricerca_inizio,
    )

    risultati = []

    for riga in cursore.fetchall():
        risultati.append({
            "codice": riga.codice,
            "codiceMnemonico": riga.codiceMnemonico,
            "descrizione": riga.descrizione.strip(),
            "unitaMisura": riga.unitaMisura,
        })

    cursore.close()
    connessione.close()

    return risultati