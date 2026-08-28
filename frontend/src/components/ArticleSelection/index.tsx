import { Button, Stack, Typography } from "@mui/material";
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
      <ArticleSearch
          onSelectArticolo={setArticoloSelezionato}
        />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography sx={{ fontWeight: "italic" }}>
          Quantità:
        </Typography>
        <QuantitySelection
          quantita={quantita}
          onChange={setQuantita}
        />

        <Button
          variant="contained"
          onClick={aggiungiArticolo}
          disabled={!articoloSelezionato}
        >
          + Aggiungi
        </Button>
      </Stack>
    </Stack>
  );
}