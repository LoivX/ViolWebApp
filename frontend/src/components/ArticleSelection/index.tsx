import { Button, Stack } from "@mui/material";
import { useState } from "react";

import ArticleSearch from "./ArticleSearch";
import QuantitySelection from "./QuantitySelection";

import type { Articolo } from "../../types/articolo";

type ArticleSelectionProps = {
  onAddArticolo: (articolo: Articolo, quantita: number) => void;
};

export default function ArticleSelection({
  onAddArticolo,
}: ArticleSelectionProps) {
  const [articoloSelezionato, setArticoloSelezionato] =
    useState<Articolo | null>(null);

  const [testoArticolo, setTestoArticolo] = useState("");
  
  const [quantita, setQuantita] = useState(1);

  function aggiungiArticolo() {
    if (!articoloSelezionato) {
      return;
    }

    onAddArticolo(articoloSelezionato, quantita);

    // Reset dopo l'aggiunta
    setArticoloSelezionato(null);
    setQuantita(1);
  }

  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center" }}
      >
        <ArticleSearch
          valore={articoloSelezionato}
          testo={testoArticolo}
          onSelectArticolo={setArticoloSelezionato}
          onChangeTesto={setTestoArticolo}
        />

        <QuantitySelection
          quantita={quantita}
          onChange={setQuantita}
        />

      </Stack>
      
        <Button
          variant="outlined"
          size="small"
          onClick={aggiungiArticolo}
          disabled={!articoloSelezionato}
          sx={{
            whiteSpace: "nowrap",
            width: "95%",
            alignSelf: "center"
          }}
        >
          + Aggiungi
        </Button>
    </Stack>
  );
}