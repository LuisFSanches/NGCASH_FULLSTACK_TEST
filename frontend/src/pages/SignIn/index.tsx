/* eslint-disable jsx-a11y/anchor-is-valid */
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import banner from "../../assets/images/banner.png";
import logo from "../../assets/images/logo.png";
import rightLogo from "../../assets/images/right-logo.png";
import { ErrorMessage } from "../../components/ErrorMessage";
import { SocialMediaLinks } from "../../components/SocialMediaLinks";
import { SubmitButton } from "../../components/SubmitButton";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Container,
  FormContainer,
  ImageContainer,
  Form,
  FormGroup,
  LogoImage,
  BannerImage,
  SignUpInformationContainer,
  RightLogoContainer,
} from "./style";

interface ISignIn {
  username: string;
  password: string;
}

export function SignIn() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignIn>();

  const handleLoginSubmit = async ({ username, password }: ISignIn) => {
    const response = await handleLogin(username, password);

    if (!response.data) {
      const { status } = response.response;
      if (status === 400) {
        return setError("password", {
          type: "custom",
          message: "Usuário ou senha inválidos",
        });
      }
      if (status === 500) {
        return setError("password", {
          type: "custom",
          message: "Ocorreu um erro, tente novamente mais tarde",
        });
      }
    }
    navigate("/dashboard");
  };

  return (
    <Container>
      <ImageContainer>
        <LogoImage src={logo} />
        <BannerImage src={banner} />
        <h1>A CARTEIRA DA NOVA GERAÇÃO</h1>
        <p>É para todas as idades!</p>
      </ImageContainer>

      <FormContainer>
        <RightLogoContainer>
          <img src={rightLogo} alt="right-logo" />
        </RightLogoContainer>

        <Form onSubmit={handleSubmit(handleLoginSubmit)}>
          <h1>
            Acesse sua carteira <FontAwesomeIcon icon={faWallet} />
          </h1>
          <FormGroup>
            <label>Usuário</label>
            <input
              type="text"
              {...register("username", {
                required: "Usuário ou senha inválidos",
              })}
            />
          </FormGroup>

          <FormGroup>
            <label>Senha</label>
            <input
              type="password"
              {...register("password", {
                required: "Usuário ou senha inválidos",
              })}
            />
          </FormGroup>

          {errors.password?.message && (
            <ErrorMessage message={`${errors.password?.message}`} />
          )}

          <SubmitButton label="Entrar" onClick={() => {}} />

          <SignUpInformationContainer>
            <Link to="/cadastro">
              <span>Ainda nao tem conta? Cadastre-se</span>
            </Link>
          </SignUpInformationContainer>
        </Form>

        <SocialMediaLinks />
      </FormContainer>
    </Container>
  );
}
