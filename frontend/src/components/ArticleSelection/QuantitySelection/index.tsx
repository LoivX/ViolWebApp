import { IconButton, Stack, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type QuantitySelectionProps = {
  quantita: number;
  onChange: (quantita: number) => void;
};

export default function QuantitySelection({
  quantita,
  onChange,
}: QuantitySelectionProps) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ alignItems: "center" }} >
      <IconButton
        size="small"
        onClick={() => {
          if (quantita > 1) {
            onChange(quantita - 1);
          }
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      <Typography
        sx={{
          minWidth: 28,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {quantita}
      </Typography>

      <IconButton
        size="small"
        onClick={() => onChange(quantita + 1)}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}