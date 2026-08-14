import { Stack, Typography, Button } from "@mui/material";

import ClientSearch from "../../components/ClientSearch";
import EmptyState from "../../components/EmptyState";
import ConfirmButton from "../../components/ConfirmButton";

import { useState } from "react";
import type { Cliente } from "../../types/cliente";

export default function Home() {

  const [clienteSelezionato, setClienteSelezionato] =
    useState<Cliente | null>(null);

  return (
    <Stack spacing={3}>
      <Typography variant="h5">
        Nuova consegna
      </Typography>

      <ClientSearch
        onSelectCliente={setClienteSelezionato}
      />
      {clienteSelezionato && (
        <div>
          Cliente selezionato: {clienteSelezionato.nome}
        </div>
      )}
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