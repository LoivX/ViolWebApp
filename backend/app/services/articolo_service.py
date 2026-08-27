articoli = [
    {
        "codice": "001",
        "nome": "PROLUNGA 20x20"
    },
    {
        "codice": "002",
        "nome": "PROLUNGA 40x40"
    },
    {
        "codice": "003",
        "nome": "CHIUSINO 20x20"
    },
    {
        "codice": "004",
        "nome": "POZZETTO 40x40"
    }
]


def cerca_articoli(testo: str):

    testo = testo.lower()

    risultati = []

    for articolo in articoli:
        if testo in articolo["nome"].lower():
            risultati.append(articolo)

    return risultati