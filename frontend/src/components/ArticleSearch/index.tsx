import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { cercaArticoli } from "../../services/api";
import type { Articolo } from "../../types/articolo";

type ArticleSearchProps = {
  onSelectArticolo: (articolo: Articolo | null) => void;
};

export default function ArticleSearch({
  onSelectArticolo,
}: ArticleSearchProps) {
  const [testoArticolo, setTestoArticolo] = useState("");
  const [articoli, setArticoli] = useState<Articolo[]>([]);

  useEffect(() => {
    if (testoArticolo.length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const risultati = await cercaArticoli(testoArticolo);
        setArticoli(risultati);
      } catch (errore) {
        console.error(errore);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [testoArticolo]);

  const articoliVisibili =
    testoArticolo.length < 2 ? [] : articoli;

  return (
    <Autocomplete
      options={articoliVisibili}
      getOptionLabel={(articolo) => articolo.nome}
      
      onChange={(_, articolo) => {
        onSelectArticolo(articolo);
      }}

      inputValue={testoArticolo}

      onInputChange={(_, nuovoTesto) => {
        setTestoArticolo(nuovoTesto);
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Cerca articolo..."
        />
      )}
    />
  );
}