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
    },
    {
        "codice": "005",
        "nome": "POZZETTO 20x40"
    },
    {
        "codice": "006",
        "nome": "POZZETTO 20x20"
    },
    {
        "codice": "007",
        "nome": "TUBO 20x20"
    },
    {
        "codice": "008",
        "nome": "TUBO 40x40"
    },
    {
        "codice": "009",
        "nome": "CHIUSINO 40x40 ZINCATO"
    }
]


def cerca_articoli(testo: str):

    testo = testo.lower()

    risultati = []

    for articolo in articoli:
        if testo in articolo["nome"].lower():
            risultati.append(articolo)

    return risultati