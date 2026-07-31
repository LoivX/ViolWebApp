clienti = [
    {
        "codice": "001",
        "nome": "ROSSI SRL"
    },
    {
        "codice": "002",
        "nome": "ROSSINI SPA"
    },
    {
        "codice": "003",
        "nome": "VERDI SRL"
    }
]


def cerca_clienti(testo: str):

    testo = testo.lower()

    risultati = []

    for cliente in clienti:
        if testo in cliente["nome"].lower():
            risultati.append(cliente)

    return risultati