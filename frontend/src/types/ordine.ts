import type { Cliente } from "./cliente";
import type { Articolo } from "./articolo";

export type RigaOrdine = {
  articolo: Articolo;
  quantita: number;
};

export type Ordine = {
  cliente: Cliente | null;
  righe: RigaOrdine[];
};