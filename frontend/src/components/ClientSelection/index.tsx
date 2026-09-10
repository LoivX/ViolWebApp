import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useState } from "react";

import { cercaClienti } from "../../services/api";
import { formattaTestoDatabase } from "../../utils/formattaTestoDatabase";

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

  const [modificaCliente, setModificaCliente] = useState(cliente === null);

  useEffect(() => {
    if (testoCliente.length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const risultati = await cercaClienti(
          testoCliente
        );

        setClienti(risultati);
      } catch (errore) {
        console.error(errore);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [testoCliente]);

  function selezionaCliente(
    nuovoCliente: Cliente | null
  ) {
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
          px: 1.5,
          py: 0.75,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            flex: 1,
            minWidth: 0,
            lineHeight: 1.2,
          }}
        >
          {formattaTestoDatabase(cliente.nome)}
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
      filterOptions={(options) => options}
      getOptionKey={(cliente) => cliente.codice}
      value={cliente}
      getOptionLabel={(cliente) =>
        formattaTestoDatabase(cliente.nome)
      }
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
      renderOption={(props, cliente) => {
        const { key, ...optionProps } = props;

        return (
          <li key={key} {...optionProps}>
            <Stack spacing={0.25} sx={{ minWidth: 0, width: "100%"}}>
              <Typography
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {formattaTestoDatabase(cliente.nome)}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{    
                  display: 'block',          // Forza il componente a comportarsi come blocco
                  minWidth: 0,               // Impedisce al testo di forzare la larghezza del contenitore
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis', 
                  maxWidth: '100%',            // Assicura che il testo non superi la larghezza del contenitore          
                }}
              >
                {'Cod. ' + cliente.codice}
                {` · ${cliente.indirizzo}`}
              </Typography>
            </Stack>
          </li>
        );
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