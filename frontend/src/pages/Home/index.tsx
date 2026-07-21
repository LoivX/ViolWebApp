import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">
        Nuova consegna
      </Typography>

      <TextField
        fullWidth
        label="Cerca cliente..."
      />

      <Button
        variant="contained"
        size="large"
      >
        + Aggiungi articolo
      </Button>

      <Card
        sx={{
          p: 3,
          textAlign: "center",
        }}
      >
        Nessun articolo inserito
      </Card>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        variant="contained"
        size="large"
        fullWidth
      >
        Conferma consegna
      </Button>
    </Stack>
  );
}