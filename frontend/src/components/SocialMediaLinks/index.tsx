import {
  faTiktok,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container, LinksContainer } from "./style";

export function SocialMediaLinks() {
  return (
    <Container>
      <p>Confira nossas redes sociais.</p>
      <LinksContainer>
        <a
          href="https://www.tiktok.com/@ng.cash"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTiktok} />
        </a>

        <a
          href="https://www.facebook.com/ng.cash.face"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>

        <a
          href="https://www.tiktok.com/@ng.cash"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </LinksContainer>
    </Container>
  );
}
