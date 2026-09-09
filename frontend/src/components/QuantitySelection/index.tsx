import { IconButton, Stack, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

type QuantitySelectionProps = {
  quantita: number;
  unitaMisura?: string;
  onChange: (quantita: number) => void;
};

const UNITA_MISURA_DISCRETE = [
  "PZ",
  "CF",
  "CT",
  "SC",
  "PA",
];

function normalizzaUnitaMisura(unitaMisura?: string) {
  return unitaMisura?.trim().toUpperCase();
}

function isUnitaDiscreta(unitaMisura?: string) {
  return UNITA_MISURA_DISCRETE.includes(
    normalizzaUnitaMisura(unitaMisura) ?? ""
  );
}

function getStep(unitaMisura?: string) {
  return isUnitaDiscreta(unitaMisura) ? 1 : 0.1;
}

function normalizzaQuantita(
  quantita: number,
  unitaMisura?: string
) {
  const step = getStep(unitaMisura);

  if (!Number.isFinite(quantita) || quantita <= 0) {
    return step === 1 ? 1 : 0.1;
  }

  if (step === 1) {
    return Math.round(quantita);
  }

  return Math.round(quantita * 10) / 10;
}

function formattaQuantita(
  quantita: number,
  unitaMisura?: string
) {
  const valore = normalizzaQuantita(
    quantita,
    unitaMisura
  );

  if (getStep(unitaMisura) === 1) {
    return String(valore);
  }

  return valore.toFixed(1).replace(/\.0$/, "");
}

export default function QuantitySelection({
  quantita,
  unitaMisura,
  onChange,
}: QuantitySelectionProps) {
  const [modifica, setModifica] = useState(false);
  const [valoreInput, setValoreInput] = useState("");

  const step = getStep(unitaMisura);

  const quantitaNormalizzata = normalizzaQuantita(
    quantita,
    unitaMisura
  );

  function diminuisci() {
    const nuovaQuantita =
      quantitaNormalizzata - step;

    if (nuovaQuantita <= 0) {
      return;
    }

    onChange(
      normalizzaQuantita(
        nuovaQuantita,
        unitaMisura
      )
    );
  }

  function aumenta() {
    const nuovaQuantita =
      quantitaNormalizzata + step;

    onChange(
      normalizzaQuantita(
        nuovaQuantita,
        unitaMisura
      )
    );
  }

  function iniziaModifica() {
    setValoreInput(
      formattaQuantita(
        quantitaNormalizzata,
        unitaMisura
      )
    );

    setModifica(true);
  }

  function confermaModifica() {
    const numero = Number(
      valoreInput.replace(",", ".")
    );

    if (Number.isFinite(numero) && numero > 0) {
      onChange(
        normalizzaQuantita(
          numero,
          unitaMisura
        )
      );
    }

    setModifica(false);
  }

  function gestisciTasto(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }

    if (event.key === "Escape") {
      setModifica(false);
    }
  }

  return (
    <Stack
      direction="row"
      spacing={0.25}
      sx={{
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <IconButton
        size="small"
        onClick={diminuisci}
        disabled={quantitaNormalizzata <= step}
        aria-label="Diminuisci quantità"
        sx={{
          width: 32,
          height: 32,
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      {modifica ? (
        <TextField
          autoFocus
          type="number"
          value={valoreInput}
          onChange={(event) =>
            setValoreInput(event.target.value)
          }
          onBlur={confermaModifica}
          onKeyDown={gestisciTasto}
          slotProps={{
            htmlInput: {
              min: step,
              step,
            },
          }}
          sx={{
            width: 48,

            "& input": {
              p: 0.25,
              textAlign: "center",
              fontSize: "0.95rem",
              fontWeight: 700,
            },

            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                WebkitAppearance: "none",
                margin: 0,
              },

            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
        />
      ) : (
        <Stack
          direction="row"
          spacing={0.25}
          onClick={iniziaModifica}
          sx={{
            minWidth: 32,
            cursor: "pointer",
            userSelect: "none",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {formattaQuantita(
              quantitaNormalizzata,
              unitaMisura
            )}
          </Typography>

          {unitaMisura && (
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 500,
                lineHeight: 1,
                color: "text.secondary",
              }}
            >
              {normalizzaUnitaMisura(
                unitaMisura
              )}
            </Typography>
          )}
        </Stack>
      )}

      <IconButton
        size="small"
        onClick={aumenta}
        aria-label="Aumenta quantità"
        sx={{
          width: 32,
          height: 32,
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}