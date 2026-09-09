import {
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

import QuantitySelection from "../QuantitySelection";

import type { RigaOrdine } from "../../types/ordine";

type ArticleListProps = {
  righe: RigaOrdine[];

  onRemove: (indice: number) => void;

  onChangeQuantity: (
    indice: number,
    quantita: number
  ) => void;

  onChangeDescrizione: (
    indice: number,
    descrizione: string
  ) => void;
};

export default function ArticleList({
  righe,
  onRemove,
  onChangeQuantity,
  onChangeDescrizione,
}: ArticleListProps) {
  if (righe.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">
          Nessun articolo aggiunto
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.25,
      }}
    >
      <Stack
        spacing={1}
        divider={
          <Divider
            variant="middle"
            flexItem
          />
        }
      >
        {righe.map((riga, indice) => (
          <ArticleRow
            key={`${riga.articolo.codice}-${indice}`}
            riga={riga}
            onRemove={() => onRemove(indice)}
            onChangeQuantity={(quantita) =>
              onChangeQuantity(
                indice,
                quantita
              )
            }
            onChangeDescrizione={(
              descrizione
            ) =>
              onChangeDescrizione(
                indice,
                descrizione
              )
            }
          />
        ))}
      </Stack>
    </Paper>
  );
}

type ArticleRowProps = {
  riga: RigaOrdine;
  onRemove: () => void;
  onChangeQuantity: (
    quantita: number
  ) => void;
  onChangeDescrizione: (
    descrizione: string
  ) => void;
};

function ArticleRow({
  riga,
  onRemove,
  onChangeQuantity,
  onChangeDescrizione,
}: ArticleRowProps) {
  const [modificaDescrizione, setModificaDescrizione] =
    useState(false);

  const [nuovaDescrizione, setNuovaDescrizione] =
    useState(riga.articolo.descrizione);

  function iniziaModifica() {
    setNuovaDescrizione(
      riga.articolo.descrizione
    );
    setModificaDescrizione(true);
  }

  function confermaModifica() {
    const descrizione =
      nuovaDescrizione.trim();

    if (!descrizione) {
      return;
    }

    onChangeDescrizione(descrizione);
    setModificaDescrizione(false);
  }

  function annullaModifica() {
    setNuovaDescrizione(
      riga.articolo.descrizione
    );
    setModificaDescrizione(false);
  }

  function gestisciTasto(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      confermaModifica();
    }

    if (event.key === "Escape") {
      annullaModifica();
    }
  }

  return (
    <Stack spacing={0.75}>
      {modificaDescrizione ? (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            autoFocus
            size="small"
            value={nuovaDescrizione}
            onChange={(event) =>
              setNuovaDescrizione(
                event.target.value
              )
            }
            onKeyDown={gestisciTasto}
          />

          <IconButton
            size="small"
            color="success"
            onClick={confermaModifica}
            disabled={
              !nuovaDescrizione.trim()
            }
            aria-label="Conferma modifica"
          >
            <CheckIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={annullaModifica}
            aria-label="Annulla modifica"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              minWidth: 0,
              fontWeight: 600,
              lineHeight: 1.2,
              overflowWrap: "anywhere",
            }}
          >
            {riga.articolo.descrizione}
          </Typography>

          <QuantitySelection
            quantita={riga.quantita}
            unitaMisura={
              riga.articolo.unitaMisura ||
              "PZ"
            }
            onChange={onChangeQuantity}
          />

          {riga.articoloLibero && (
            <IconButton
              size="small"
              onClick={iniziaModifica}
              aria-label="Modifica descrizione"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}

          <IconButton
            size="small"
            color="error"
            onClick={onRemove}
            aria-label="Rimuovi articolo"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}