import { Stack, Typography, Button } from "@mui/material";

import ClientSearch from "../../components/ClientSearch";
import EmptyState from "../../components/EmptyState";
import ConfirmButton from "../../components/ConfirmButton";

export default function Home() {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">
        Nuova consegna
      </Typography>

      <ClientSearch />

      <Button
        variant="contained"
        size="large"
      >
        + Aggiungi articolo
      </Button>

      <EmptyState />

      <ConfirmButton />
    </Stack>
  );
}