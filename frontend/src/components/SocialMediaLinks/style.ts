import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  text-align: center;

  p {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    font-style: italic;
    text-decoration: underline;
  }

  a {
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    text-align: center;
    font-size: 1.8rem;
    color: #fff;
    background-color: #1c1c1c;
    border-radius: 50%;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 3rem;
`;
