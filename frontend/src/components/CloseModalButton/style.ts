import styled from "styled-components";

export const CloseButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  font-size: 1.5rem;
  background: transparent;
  color: #fff;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;
