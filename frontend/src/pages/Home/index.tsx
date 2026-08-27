import { Stack, Typography, Button } from "@mui/material";

import ClientSearch from "../../components/ClientSearch";
import ArticleSearch from "../../components/ArticleSearch";
import EmptyState from "../../components/EmptyState";
import ConfirmButton from "../../components/ConfirmButton";

import { useState } from "react";
import type { Cliente } from "../../types/cliente";
import type { Articolo } from "../../types/articolo";

export default function Home() {
  const [clienteSelezionato, setClienteSelezionato] = useState<Cliente | null>(
    null
  );
  const [articoloSelezionato, setArticoloSelezionato] =
    useState<Articolo | null>(null);
  const [mostraClienteSelezionato, setMostraClienteSelezionato] =
    useState(false);

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Nuova consegna</Typography>

      <Stack spacing={1}>
        <Typography variant="h6">Cliente</Typography>

        <ClientSearch onSelectCliente={setClienteSelezionato} />
        <Button
          variant="contained"
          size="small"
          onClick={() => setMostraClienteSelezionato(true)}
        >
          Seleziona cliente
        </Button>
        {mostraClienteSelezionato && (
          <div>Cliente Selezionato: {clienteSelezionato?.nome}</div>
        )}
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6">Articoli</Typography>

        <ArticleSearch onSelectArticolo={setArticoloSelezionato} />
        {articoloSelezionato && (
          <div>Articolo selezionato: {articoloSelezionato.nome}</div>
        )}
        <Button 
        variant="contained" 
        size="small">
          + Aggiungi articolo
        </Button>
      </Stack>

      <EmptyState />

      <ConfirmButton />
    </Stack>
  );
}
