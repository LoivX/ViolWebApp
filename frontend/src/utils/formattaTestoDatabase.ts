const PAROLE_MAUSCOLE = new Set([
  "SRL",
  "SNC",
  "SAS",
  "SPA",
  "SRLS",
  "SA",
  "AG",
  "PVC",
  "PE",
  "PEHD",
  "PP",
  "ABS",
  "PTFE",
  "INOX",
  "AISI",
  "EPDM",
  "NBR",
  "PA",
  "PZ",
  "CF",
  "CT",
  "SC",
  "DN",
  "PN",
  "ISO",
  "UNI",
  "DIN",
  "EN",
  "TIG",
  "PP",
  "CLS",
]);

function formattaParola(parola: string): string {
  if (!parola) {
    return parola;
  }

  const parolaMaiuscola = parola.toUpperCase();

  if (PAROLE_MAUSCOLE.has(parolaMaiuscola)) {
    return parolaMaiuscola;
  }

  // Codici e sigle con numeri: M8, M10X40, DN50, 3/4", ecc.
  if (/\d/.test(parola)) {
    return parolaMaiuscola;
  }

  return (
    parola.charAt(0).toUpperCase() +
    parola.slice(1).toLowerCase()
  );
}

export function formattaTestoDatabase(testo: string): string {
  if (!testo) {
    return testo;
  }

  return testo
    .trim()
    .split(/\s+/)
    .map((parola) => {
      // Mantiene la punteggiatura finale separata logicamente
      const match = parola.match(/^(.+?)([.,;:]?)$/);

      if (!match) {
        return parola;
      }

      const [, contenuto, punteggiatura] = match;

      return (
        formattaParola(contenuto) +
        punteggiatura
      );
    })
    .join(" ")
    // Nelle dimensioni tecniche X diventa x:
    // M8 X 40 -> M8 x 40
    .replace(
      /(\d)\s+[Xx]\s+(\d)/g,
      "$1 x $2"
    );
}