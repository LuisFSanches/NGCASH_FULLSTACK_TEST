import styled from "styled-components";

export const Container = styled.div`
  height: 5rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--black);

  @media (max-width: 500px) {
    height: 3rem;
  }
`;

export const UserDataContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-left: 3rem;

  span {
    color: #fff;
    font-size: 1.8rem;
    margin-right: 1rem;
  }
  h2 {
    color: #fff;
  }

  @media (max-width: 500px) {
    margin-left: 1rem;
    font-size: 1.1rem;

    span {
      font-size: 1.4rem;
      margin-right: 0.3rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 3rem;

  @media (max-width: 500px) {
    margin-right: 0.5rem;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-left: 3rem;
`;

export const BalanceAction = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 1.35rem;
  }
  button {
    font-size: 1.2rem;
    margin-left: 1rem;
    color: #fff;
  }

  @media (max-width: 500px) {
    p {
      font-size: 1.2rem;
    }
  }
`;
