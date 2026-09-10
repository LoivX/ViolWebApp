import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { cercaArticoli } from "../../../services/api";
import { formattaTestoDatabase } from "../../../utils/formattaTestoDatabase";

import type { Articolo } from "../../../types/articolo";

type ArticleSearchProps = {
  valore: Articolo | null;
  testo: string;
  onSelectArticolo: (articolo: Articolo | null) => void;
  onChangeTesto: (testo: string) => void;
};

export default function ArticleSearch({
  valore,
  testo,
  onSelectArticolo,
  onChangeTesto,
}: ArticleSearchProps) {
  const [articoli, setArticoli] = useState<Articolo[]>([]);

  useEffect(() => {
    if (testo.length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const risultati = await cercaArticoli(testo);
        setArticoli(risultati);
      } catch (errore) {
        console.error(errore);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [testo]);

  return (
    <Autocomplete
      fullWidth
      options={articoli}
      filterOptions={(options) => options}
      getOptionKey={(articolo) => articolo.codice}
      value={valore}
      getOptionLabel={(articolo) =>
        formattaTestoDatabase(
          articolo.descrizione
        )
      }
      onChange={(_, articolo) => {
        onSelectArticolo(articolo);
      }}
      inputValue={testo}
      onInputChange={(_, nuovoTesto) => {
        onChangeTesto(nuovoTesto);

        if (nuovoTesto.length < 2) {
          setArticoli([]);
        }
      }}
      renderOption={(props, articolo) => {
        const {key, ...rest} = props;
        return (
          <li key={key} {...rest}>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {formattaTestoDatabase(
                  articolo.descrizione
                )}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {` Cod. ${articolo.codice}`}
              </Typography>
            </Stack>
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cerca articolo..."
        />
      )}
    />
  );
}