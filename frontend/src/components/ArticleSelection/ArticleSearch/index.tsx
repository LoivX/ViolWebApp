import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { cercaArticoli } from "../../../services/api";
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
      value={valore}
      getOptionLabel={(articolo) => articolo.descrizione}
      
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
      
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cerca articolo..."
        />
      )}
    />
  );
}