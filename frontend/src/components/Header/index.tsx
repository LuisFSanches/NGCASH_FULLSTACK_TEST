import {
  faUser,
  faEye,
  faEyeSlash,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { ActionButton } from "../ActionButton";
import {
  ActionsContainer,
  Container,
  UserDataContainer,
  BalanceContainer,
  BalanceAction,
} from "./style";

interface IHeader {
  username: string;
  balance: number;
}

export function Header({ username, balance }: IHeader) {
  const { handleSignOut } = useContext(AuthContext);

  const [showBalance, setShowBalance] = useState(true);

  return (
    <Container>
      <UserDataContainer>
        <span>
          <FontAwesomeIcon icon={faUser} />
        </span>

        <h2>{username}</h2>

        <BalanceContainer>
          <BalanceAction>
            <p>Saldo</p>
            <button onClick={() => setShowBalance(!showBalance)}>
              <FontAwesomeIcon icon={!showBalance ? faEye : faEyeSlash} />
            </button>
          </BalanceAction>
          {showBalance && <h3>{formatCurrency(balance)}</h3>}
        </BalanceContainer>
      </UserDataContainer>

      <ActionsContainer>
        <ActionButton
          label="Sair"
          color="#f44336"
          icon={faArrowRightFromBracket}
          onClick={handleSignOut}
          style={{ width: "7rem" }}
        />
      </ActionsContainer>
    </Container>
  );
}
