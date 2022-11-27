import styled from "styled-components";

interface IActionButton {
  color: string;
}

export const Button = styled.button<IActionButton>`
  width: 10rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.color};
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  transition: filter 0.2s;
  span {
    margin-right: 0.6rem;
  }

  &:hover {
    filter: brightness(75%);
  }
`;
