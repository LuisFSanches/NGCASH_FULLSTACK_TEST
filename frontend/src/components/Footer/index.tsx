import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container } from "./style";

export function Footer() {
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <span>Desenvolvido por: Luis Felipe Sanches</span>
        <a
          href="https://github.com/LuisFSanches"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <span>Processo seletivo NG Cash 2022</span>
    </Container>
  );
}
