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

import { formattaTestoDatabase } from "../../utils/formattaTestoDatabase";

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
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Nessun articolo aggiunto
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
      }}
    >
      <Stack
        spacing={0.75}
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
              onChangeQuantity(indice, quantita)
            }
            onChangeDescrizione={(descrizione) =>
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
  onChangeQuantity: (quantita: number) => void;
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
  const [modifica, setModifica] = useState(false);

  const [nuovaDescrizione, setNuovaDescrizione] = useState(riga.articolo.descrizione);

  const [nuovaQuantita, setNuovaQuantita] = useState(riga.quantita);

  function iniziaModifica() {
    setNuovaDescrizione(
      riga.articolo.descrizione
    );

    setNuovaQuantita(riga.quantita);

    setModifica(true);
  }

  function confermaModifica() {
    const descrizione = nuovaDescrizione.trim();

    if (!descrizione) {
      return;
    }

    onChangeQuantity(nuovaQuantita);

    if (riga.articoloLibero) {
      onChangeDescrizione(descrizione);
    }

    setModifica(false);
  }

  function annullaModifica() {
    setNuovaDescrizione(
      riga.articolo.descrizione
    );

    setNuovaQuantita(riga.quantita);

    setModifica(false);
  }

  return (
    <Stack spacing={0.75}>
      {/* Riga principale */}
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <Stack
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {modifica && riga.articoloLibero ? (
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
            />
          ) : (
            <Typography
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                overflowWrap: "anywhere",
              }}
            >
              {formattaTestoDatabase(
                riga.articolo.descrizione
              )}
            </Typography>
          )}

          {/* Nascondiamo la caption durante la modifica */}
          {!modifica && (
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {riga.quantita}{" "}
              {riga.articolo.unitaMisura || "PZ"}
            </Typography>
          )}
        </Stack>

        <IconButton
          size="small"
          onClick={iniziaModifica}
          aria-label="Modifica articolo"
        >
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          color="error"
          onClick={onRemove}
          aria-label="Rimuovi articolo"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* Modifica quantità */}
      {modifica && (
        <Stack
          spacing={0.75}
          sx={{
            pl: 0.5,
            pr: 0.5,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <QuantitySelection
              quantita={nuovaQuantita}
              unitaMisura={
                riga.articolo.unitaMisura || "PZ"
              }
              onChange={setNuovaQuantita}
            />

            <Stack
              direction="row"
              spacing={0.25}
            >
              <IconButton
                size="small"
                color="success"
                onClick={confermaModifica}
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
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

