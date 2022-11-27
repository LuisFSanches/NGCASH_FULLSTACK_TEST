import { Container } from "./style";

interface ITransactionCard {
  label: string;
  value: number;
}

export function TransactionCard({ label, value }: ITransactionCard) {
  return (
    <Container>
      <h2>{label}</h2>
      <p>{value}</p>
    </Container>
  );
}
