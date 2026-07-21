import { Card, Typography } from "@mui/material";

export default function EmptyState() {
  return (
    <Card sx={{ p: 4, textAlign: "center" }}>
      <Typography color="text.secondary">
        Nessun articolo inserito
      </Typography>
    </Card>
  );
}