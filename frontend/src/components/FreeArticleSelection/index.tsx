import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
//import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";

import QuantitySelection from "../QuantitySelection";

import type { Articolo } from "../../types/articolo";

type FreeArticleSelectionProps = {
  onAddArticolo: (
    articolo: Articolo,
    quantita: number
  ) => void;
};

export default function FreeArticleSelection({
  onAddArticolo,
}: FreeArticleSelectionProps) {
  const [aperto, setAperto] = useState(false);
  const [descrizione, setDescrizione] = useState("");
  const [quantita, setQuantita] = useState(1);

  function apri() {
    setAperto(true);
    setDescrizione("");
    setQuantita(1);
  }

  function annulla() {
    setAperto(false);
    setDescrizione("");
    setQuantita(1);
  }

  function aggiungi() {
    const descrizionePulita = descrizione.trim();

    if (!descrizionePulita) {
      return;
    }

    const articolo: Articolo = {
      codice: "00",
      codiceMnemonico: "",
      descrizione: descrizionePulita,
      unitaMisura: "PZ",
    };

    onAddArticolo(articolo, quantita);

    annulla();
  }

  if (!aperto) {
    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Articolo fuori campo?
        </Typography>

        <Button
          variant="text"
          size="small"
          startIcon={<AddIcon fontSize="small" />}
          onClick={apri}
        >
          Articolo libero
        </Button>
      </Stack>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        mt: 1,
      }}
    >
      <Stack spacing={1.5}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
          }}
        >
          Articolo fuori campo
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            autoFocus
            label="Descrizione articolo"
            value={descrizione}
            onChange={(event) =>
              setDescrizione(event.target.value)
            }
          />

          <QuantitySelection
            quantita={quantita}
            unitaMisura="PZ"
            onChange={setQuantita}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="text"
            size="small"
            onClick={annulla}
          >
            Annulla
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={aggiungi}
            disabled={!descrizione.trim()}
          >
            Aggiungi
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}