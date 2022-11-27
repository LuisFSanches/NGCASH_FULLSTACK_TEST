import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    align-self: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  label {
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
    align-self: start;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
  }

  input,
  select {
    width: 20rem;
    padding: 0.8rem;
    border: 2px solid var(--black);
    border-radius: 1rem;
    background: #4e4e4e;
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

export const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
