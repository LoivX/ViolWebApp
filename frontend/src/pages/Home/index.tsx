import { Stack, Typography } from "@mui/material";
import { useState } from "react";

import ClientSelection from "../../components/ClientSelection";
import ArticleSelection from "../../components/ArticleSelection";
import FreeArticleSelection from "../../components/FreeArticleSelection";
import ConfirmButton from "../../components/ConfirmButton";
import ArticleList from "../../components/ArticleList";

import type { Cliente } from "../../types/cliente";
import type { RigaOrdine } from "../../types/ordine";

export default function Home() {
  const [clienteSelezionato, setClienteSelezionato] =
    useState<Cliente | null>(null);

  const [righeOrdine, setRigheOrdine] =
    useState<RigaOrdine[]>([]);

  const consegnaNonValida =
    clienteSelezionato === null ||
    righeOrdine.length === 0;

  function aggiungiArticolo(
    articolo: RigaOrdine["articolo"],
    quantita: number
  ) {
    setRigheOrdine((precedenti) => {
      const esistente = precedenti.find(
        (riga) =>
          !riga.articoloLibero &&
          riga.articolo.codice === articolo.codice
      );

      if (esistente) {
        return precedenti.map((riga) =>
          !riga.articoloLibero &&
          riga.articolo.codice === articolo.codice
            ? {
                ...riga,
                quantita: riga.quantita + quantita,
              }
            : riga
        );
      }

      return [
        ...precedenti,
        {
          articolo,
          quantita,
          articoloLibero: false,
        },
      ];
    });
  }

  function aggiungiArticoloLibero(
    articolo: RigaOrdine["articolo"],
    quantita: number
  ) {
    setRigheOrdine((precedenti) => [
      ...precedenti,
      {
        articolo,
        quantita,
        articoloLibero: true,
      },
    ]);
  }

  function rimuoviArticolo(indice: number) {
    setRigheOrdine((precedenti) =>
      precedenti.filter((_, i) => i !== indice)
    );
  }

  function modificaQuantita(
    indice: number,
    nuovaQuantita: number
  ) {
    setRigheOrdine((precedenti) =>
      precedenti.map((riga, i) =>
        i === indice
          ? {
              ...riga,
              quantita: nuovaQuantita,
            }
          : riga
      )
    );
  }

  function modificaDescrizione(
    indice: number,
    descrizione: string
  ) {
    setRigheOrdine((precedenti) =>
      precedenti.map((riga, i) =>
        i === indice
          ? {
              ...riga,
              articolo: {
                ...riga.articolo,
                descrizione,
              },
            }
          : riga
      )
    );
  }

  function confermaConsegna() {
    console.log("CLIENTE:", clienteSelezionato);
    console.log("ARTICOLI:", righeOrdine);

    setClienteSelezionato(null);
    setRigheOrdine([]);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">
        Nuova consegna
      </Typography>

      <Stack spacing={1}>
        <Typography variant="h6">
          Cliente
        </Typography>

        <ClientSelection
          cliente={clienteSelezionato}
          onSelectCliente={
            setClienteSelezionato
          }
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6">
          Articoli
        </Typography>

        <ArticleSelection
          onAddArticolo={aggiungiArticolo}
        />

        <FreeArticleSelection
          onAddArticolo={
            aggiungiArticoloLibero
          }
        />

        <ArticleList
          righe={righeOrdine}
          onRemove={rimuoviArticolo}
          onChangeQuantity={
            modificaQuantita
          }
          onChangeDescrizione={
            modificaDescrizione
          }
        />
      </Stack>

      <ConfirmButton
        disabled={consegnaNonValida}
        onClick={confermaConsegna}
      />
    </Stack>
  );
}
