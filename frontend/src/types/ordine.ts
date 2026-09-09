import type { Cliente } from "./cliente";
import type { Articolo } from "./articolo";

export type RigaOrdine = {
  articolo: Articolo;
  quantita: number;
  articoloLibero?: boolean;
};

export type Ordine = {
  cliente: Cliente | null;
  righe: RigaOrdine[];
};