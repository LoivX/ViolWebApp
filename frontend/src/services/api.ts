const BASE_URL = "http://localhost:8000";

export async function cercaClienti(testo: string) {
    console.log("Ricerca cliente:", testo);
    const response = await fetch(
        `${BASE_URL}/api/clienti/cerca?q=${encodeURIComponent(testo)}`
    );

    if (!response.ok) {
        throw new Error("Errore nella richiesta");
    }

    return response.json();
}