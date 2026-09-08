import pyodbc


SERVER = "euro2000-sql"
DATABASE = "euro2000_dev"
USERNAME = "sa"
PASSWORD = "PasswordMoltoSicura123!"


def get_connection():
    connection = pyodbc.connect(
        f"DRIVER={{ODBC Driver 18 for SQL Server}};"
        f"SERVER={SERVER},1433;"
        f"DATABASE={DATABASE};"
        f"UID={USERNAME};"
        f"PWD={PASSWORD};"
        f"TrustServerCertificate=yes;"
    )

    return connection