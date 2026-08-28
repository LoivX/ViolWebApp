import { IconButton, Stack, Typography, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { RigaOrdine } from "../../types/ordine";

type ArticleListProps = {
  righe: RigaOrdine[];
  onRemove: (codiceArticolo: string) => void;
};

export default function ArticleList({
  righe,
  onRemove,
}: ArticleListProps) {
  if (righe.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary" align="center">
          Nessun articolo aggiunto
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={1}>
      {righe.map((riga) => (
        <Paper
          key={riga.articolo.codice}
          sx={{ p: 2 }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <div>
              <Typography sx={{ fontWeight: "bold" }}>
                {riga.articolo.nome}
              </Typography>

              <Typography color="text.secondary">
                Quantità: {riga.quantita}
              </Typography>
            </div>

            <IconButton
              color="error"
              onClick={() => onRemove(riga.articolo.codice)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}