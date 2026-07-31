import { TextField } from "@mui/material";
import { useEffect } from "react";
import { cercaClienti } from "../../services/api";

export default function ClientSearch() {
  useEffect(() => {

    async function prova() {

        const clienti = await cercaClienti("ross");

        console.log(clienti);

    }

    prova();

  }, []);

  return (
    <TextField
      fullWidth
      label="Cerca cliente..."
    />
  );
}