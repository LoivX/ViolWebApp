// Questo file contiene le funzioni che fanno da interfaccia tra il frontend e il backend, gestendo le chiamate API per la ricerca di clienti e articoli.

const BASE_URL = "http://localhost:8000";

export async function cercaClienti(testo: string) {
    console.log("Ricerca cliente:", testo);
    const response = await fetch(
        `${BASE_URL}/api/clienti/cerca?q=${encodeURIComponent(testo)}`
    );

    if (!response.ok) {
        throw new Error("Errore nella ricerca del cliente");
    }

    return response.json();
}

export async function cercaArticoli(testo: string) {
    console.log("Ricerca articolo:", testo);
    const response = await fetch(
        `${BASE_URL}/api/articoli/cerca?q=${encodeURIComponent(testo)}`
    );

    if (!response.ok) {
        throw new Error("Errore nella ricerca degli articoli");
    }

    return response.json();
    }