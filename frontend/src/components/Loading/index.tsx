import loading from "../../assets/images/loading-gif.gif";
import { Container } from "./style";

export function LoadingContainer() {
  return (
    <Container>
      <img src={loading} alt="loading" />
      <h2>Carregando carteira</h2>
    </Container>
  );
}
