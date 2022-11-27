import styled from "styled-components";

export const Container = styled.div`
  width: 17rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  border-radius: 1.3rem;
  background: #2c2c2c;
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem #939393;

  h2 {
    font-size: 1.3rem;
    margin-top: 0.8rem;
    text-align: center;
    color: #fff;
  }

  p {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    color: var(--green);
    margin-top: 0.3rem;
  }

  @media (max-width: 650px) {
    width: 18rem;
    height: 5rem;
    margin-bottom: 15px;

    h2 {
      margin-top: 0.3rem;
    }

    p {
      font-size: 2rem;
    }
  }
`;
