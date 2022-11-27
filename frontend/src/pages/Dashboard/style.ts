import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fbfbfb;
`;

export const ContainerBody = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  scroll-y: scroll;
`;

export const ActionButtonsContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;

  @media (max-width: 500px) {
    margin-bottom: 0.7rem;
  }
`;

export const Cards = styled.div`
  width: 100%;
  display: grid;
  margin-top: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const TableContainer = styled.div`
  max-width: 80vw;
  width: 80%;
  height: 50vh;
  margin-bottom: 0.3rem;
  border: 1px solid black;
  border-radius: 0.8rem;
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem #939393;
  overflow-y: auto;

  @media (max-width: 500px) {
    height: 40vh;
`;

export const Table = styled.table`
  width: 100%;
  max-height: 50vh;
  border-collapse: collapse;
  font-size: 1.4rem;
  background-color: #fff;
  color: #222222;

  thead {
    background-color: #2c2c2c;
    color: #fff;
    font-size: 1.6rem;
  }

  thead tr {
    text-align: center;
  }

  th,
  td {
    padding: 0.9rem;
    font-size: 1.2rem;
  }

  tbody {
    overflow-x: scroll;
  }

  tbody tr {
    text-align: center;
    border-bottom: 1px solid #666666;
  }

  tbody tr:nth-of-type(even) {
    background-color: #dcdcdc;
  }

  .checkIn {
    color: var(--green);
    font-weight: 600;
  }

  .checkOut {
    color: red;
    font-weight: 600;
  }
  span {
    font-size: 1.25rem;
    margin-left: 0.5rem;
  }
`;
export const EmptyWalletContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  img {
    width: 10rem;
  }
  span {
    font-size: 1.4rem;
    font-weight: 600;
    font-style: italic;
    margin: 0 !important;
  }
  @media (max-width: 500px) {
    img {
      width: 7rem;
    }
  }
`;
