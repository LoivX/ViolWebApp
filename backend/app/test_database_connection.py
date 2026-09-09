from app.database import get_connection


try:
    connection = get_connection()

    print("CONNESSIONE AL DATABASE RIUSCITA!")

    connection.close()

except Exception as errore:
    print("ERRORE DI CONNESSIONE:")
    print(errore)