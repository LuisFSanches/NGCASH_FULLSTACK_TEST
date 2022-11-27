import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  color: #fff;

  h1 {
    margin-left: 2.5rem;
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }
  p {
    margin-left: 2.5rem;
    font-size: 2.2rem;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const LogoImage = styled.img`
  width: 25%;
  height: 10%;
  align-self: center;
`;

export const BannerImage = styled.img`
  width: 70%;
  height: 70%;
  align-self: center;
`;

export const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1000px) {
    width: 100%;
    justify-content: space-around;
  }
`;

export const RightLogoContainer = styled.div`
  display: flex;
  justify-content: center;

  img {
    height: 9rem;
  }
  @media (max-width: 680px) {
    width: 100vw;
    opacity: 1;
  }
`;

export const Form = styled.form`
  min-height: 60vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  border-radius: 1rem;

  h1 {
    margin-bottom: 1rem;
    font-size: 3rem;
    font-weight: bold;
    color: var(--black);
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 380px) {
    height: 80vh;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;

  label {
    margin-left: 12%;
    margin-bottom: 0.4rem;
    align-self: start;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--black);
  }

  input {
    width: 80%;
    min-width: 25rem;
    padding: 0.8rem;
    border: 2px solid var(--black);
    border-radius: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    padding: 1rem 0rem;
    input {
      width: 25rem;
    }

    label {
      margin-left: 0px;
    }
  }
`;

export const SignUpInformationContainer = styled.div`
  width: 100%;
  margin: 2.5rem 1rem 0.5rem;
  text-align: center;

  span {
    font-size: 1.35rem;
    color: var(--black);
    font-weight: bold;
  }
`;
