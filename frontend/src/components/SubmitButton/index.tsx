import { Button } from "./style";

interface ISubmitButton {
  label: string;
  onClick: () => void;
}

export function SubmitButton({ label, onClick }: ISubmitButton) {
  return <Button onClick={onClick}>{label}</Button>;
}
