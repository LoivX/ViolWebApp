import { Button, Stack, TextField } from "@mui/material";

type QuantitySelectionProps = {
  quantita: number;
  onChange: (quantita: number) => void; // Callback per aggiornare la quantità
};

export default function QuantitySelection({
  quantita,
  onChange,
}: QuantitySelectionProps) {
  function diminuisci() {
    if (quantita > 1) {
      onChange(quantita - 1);
    }
  }

  function aumenta() {
    onChange(quantita + 1);
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Button
        variant="outlined"
        onClick={diminuisci}
      >
        −
      </Button>

      <TextField
        value={quantita}
        onChange={(e) => {
          const valore = Number(e.target.value);

          if (valore >= 1) {
            onChange(valore);
          }
        }}
        slotProps={{
            htmlInput: {
            min: 1,
            }
        }}
        sx={{ width: 70, textAlign: "center" }}
      />

      <Button
        variant="outlined"
        onClick={aumenta}
      >
        +
      </Button>
    </Stack>
  );
}