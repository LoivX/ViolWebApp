import { Stack, Typography} from "@mui/material";
import { useState } from "react";

import ClientSelection from "../../components/ClientSelection";
import ArticleSelection from "../../components/ArticleSelection";
import ConfirmButton from "../../components/ConfirmButton";
import ArticleList from "../../components/ArticleList";

import type { Cliente } from "../../types/cliente";
import type { RigaOrdine } from "../../types/ordine";

export default function Home() {
  const [clienteSelezionato, setClienteSelezionato] = useState<Cliente | null>(null);

  const [righeOrdine, setRigheOrdine] = useState<RigaOrdine[]>([]);

  const consegnaNonValida = clienteSelezionato === null || righeOrdine.length === 0;

  function aggiungiArticolo(
    articolo: RigaOrdine["articolo"],
    quantita: number
  ) {
    setRigheOrdine((precedenti) => {
      const esistente = precedenti.find(
        (riga) => riga.articolo.codice === articolo.codice
      );

      if (esistente) {
        return precedenti.map((riga) =>
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
        },
      ];
    });
  }
  function rimuoviArticolo(codiceArticolo: string) {
    setRigheOrdine((precedenti) =>
      precedenti.filter(
        (riga) => riga.articolo.codice !== codiceArticolo
      )
    );
  }
  function modificaQuantita(
    codiceArticolo: string,
    nuovaQuantita: number
  ) {
    setRigheOrdine((precedenti) =>
      precedenti.map((riga) =>
        riga.articolo.codice === codiceArticolo
          ? {
              ...riga,
              quantita: nuovaQuantita,
            }
          : riga
      )
    );
  }
  function confermaConsegna() {
  console.log("CLIENTE:", clienteSelezionato);
  console.log("RIGHE:", righeOrdine);
  setClienteSelezionato(null);
  setRigheOrdine([]);
}

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Nuova consegna</Typography>

      <Stack spacing={1}>
        <Typography variant="h6">Cliente</Typography>

        <ClientSelection     
          cliente={clienteSelezionato}
          onSelectCliente={setClienteSelezionato} 
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6">Articoli</Typography>
        <ArticleSelection onAddArticolo={aggiungiArticolo} />
        <ArticleList 
          righe={righeOrdine} 
          onRemove={rimuoviArticolo}
          onChangeQuantity={modificaQuantita} 
        />
      </Stack>

      <ConfirmButton 
        disabled={consegnaNonValida}
        onClick={confermaConsegna}
      />
    </Stack>
  );
}
