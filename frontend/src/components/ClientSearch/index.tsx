import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { cercaClienti } from "../../services/api";
import type { Cliente } from "../../types/cliente";

type ClientSearchProps = {
  onSelectCliente: (cliente: Cliente | null) => void;
};

export default function ClientSearch({
  onSelectCliente,
}: ClientSearchProps) {
  const [testoCliente, setTestoCliente] = useState("");
  const [clienti, setClienti] = useState<Cliente[]>([]);

  useEffect(() => {
    if (testoCliente.length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const risultati = await cercaClienti(testoCliente);
        setClienti(risultati);
      } catch (errore) {
        console.error(errore);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [testoCliente]);

  const clientiVisibili =
    testoCliente.length < 2 ? [] : clienti;

  return (
    <Autocomplete
      options={clientiVisibili}

      getOptionLabel={(cliente) => cliente.nome}

      onChange={(_, cliente) => {
        onSelectCliente(cliente);
      }}

      inputValue={testoCliente}

      onInputChange={(_, nuovoTesto) => {
        setTestoCliente(nuovoTesto);
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Cerca cliente..."
        />
      )}
    />
  );
}