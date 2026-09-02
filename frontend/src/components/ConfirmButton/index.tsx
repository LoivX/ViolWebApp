import { Button } from "@mui/material";

type ConfirmButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export default function ConfirmButton({
  disabled,
  onClick,
}: ConfirmButtonProps) {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      disabled={disabled}
      onClick={onClick}
    >
      Conferma consegna
    </Button>
  );
}