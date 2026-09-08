import { IconButton, Stack, Typography, Paper, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import QuantitySelection from "../ArticleSelection/QuantitySelection";

import type { RigaOrdine } from "../../types/ordine";

type ArticleListProps = {
  righe: RigaOrdine[];
  onRemove: (codiceArticolo: string) => void;
  onChangeQuantity: (
    codiceArticolo: string,
    quantita: number
  ) => void;
};

export default function ArticleList({
  righe,
  onRemove,
  onChangeQuantity,
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
        p: 1.5,
        }}
    >
        <Stack 
          spacing={1.5}
          divider={<Divider variant="middle" flexItem />}
        >
        {righe.map((riga) => (
          <Stack
            key={riga.articolo.codice}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}

          >
            {/* NOME ARTICOLO */}
            <Typography
              sx={{
                flex: 1,
                fontWeight: 600,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {riga.articolo.descrizione}
            </Typography>

            {/* QUANTITÀ */}
            <QuantitySelection
              quantita={riga.quantita}
              onChange={(quantita) =>
                onChangeQuantity(
                  riga.articolo.codice,
                  quantita
                )
              }
            />

            {/* RIMUOVI */}
            <IconButton
              color="error"
              size="small"
              onClick={() =>
                onRemove(riga.articolo.codice)
              }
              aria-label="Rimuovi articolo"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
        </Stack>
    </Paper>
  );
}