import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { cercaClienti } from "../../services/api";
import type { Cliente } from "../../types/cliente";

export default function ClientSearch() {
  const [testoCliente, setTestoCliente] = useState("");
  const [clienti, setClienti] = useState<Cliente[]>([]);

  useEffect(() => {
    if (testoCliente.length < 2) {
      return;
    }

    async function cerca() {
      try {
        const risultati = await cercaClienti(testoCliente);
        setClienti(risultati);
      } catch (errore) {
        console.error(errore);
      }
    }

    cerca();
  }, [testoCliente]);

  const clientiVisibili =
    testoCliente.length < 2 ? [] : clienti;

  return (
    <>
      <TextField
        fullWidth
        label="Cerca cliente..."
        value={testoCliente}
        onChange={(e) => setTestoCliente(e.target.value)}
      />

      {clientiVisibili.map((cliente) => (
        <div key={cliente.codice}>
          {cliente.nome}
        </div>
      ))}
    </>
  );
}