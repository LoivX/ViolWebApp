import {Autocomplete, IconButton, Stack, TextField, Typography} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useState } from "react";
import { cercaClienti } from "../../services/api";
import type { Cliente } from "../../types/cliente";

type ClientSelectionProps = {
  cliente: Cliente | null;
  onSelectCliente: (cliente: Cliente | null) => void;
};

export default function ClientSelection({
  cliente,
  onSelectCliente,
}: ClientSelectionProps) {
  const [testoCliente, setTestoCliente] = useState("");
  const [clienti, setClienti] = useState<Cliente[]>([]);
  const [modificaCliente, setModificaCliente] = useState(
    cliente === null
  );

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

  function selezionaCliente(nuovoCliente: Cliente | null) {
    onSelectCliente(nuovoCliente);

    if (nuovoCliente) {
      setModificaCliente(false);
      setTestoCliente("");
    }
  }

  if (cliente && !modificaCliente) {
    return (
      <Stack
        direction="row"
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          px: 2,
          py: 1,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography sx={{ fontWeight: 600, flex: 1, minWidth: 0 }}>
          {cliente.nome}
        </Typography>

        <IconButton
          size="small"
          onClick={() => setModificaCliente(true)}
          aria-label="Modifica cliente"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Autocomplete
      fullWidth
      options={clienti}
      value={cliente}
      getOptionLabel={(cliente) => cliente.nome}
      onChange={(_, nuovoCliente) => {
        selezionaCliente(nuovoCliente);
      }}
      inputValue={testoCliente}
      onInputChange={(_, nuovoTesto) => {
        setTestoCliente(nuovoTesto);

        if (nuovoTesto.length < 2) {
          setClienti([]);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cerca cliente..."
        />
      )}
    />
  );
}