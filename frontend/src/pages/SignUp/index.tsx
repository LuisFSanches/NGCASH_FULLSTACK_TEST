import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  RightLogoContainer,
} from "../SignIn/style";

interface ISignUp {
  username: string;
  password: string;
}

export function SignUp() {
  const navigate = useNavigate();
  const { handleSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUp>();

  const setErrorMessage = (field: "username" | "password", message: string) => {
    return setError(field, {
      type: "custom",
      message,
    });
  };

  const handleSignUpSubmit = async ({ username, password }: ISignUp) => {
    const response = await handleSignUp(username, password);

    if (!response.data) {
      const { status } = response.response;
      console.log(status);
      if (status === 400) {
        return setErrorMessage("username", "Usuário ou senha inválidos");
      }
      if (status === 409) {
        return setErrorMessage("username", "Usuário já cadastrado");
      }
      if (status === 500) {
        return setErrorMessage(
          "username",
          "Ocorreu um erro, tente novamente mais tarde"
        );
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
          <img src={rightLogo} alt="logo-mobile" />
        </RightLogoContainer>

        <Form onSubmit={handleSubmit(handleSignUpSubmit)}>
          <h1>Cadastre-se!</h1>
          <span
            style={{
              fontSize: "1.3rem",
              fontWeight: "500",
              fontStyle: "italic",
            }}
          >
            Venha fazer parte da revolução.
          </span>
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

          {errors.username?.message && (
            <ErrorMessage message={`${errors.username?.message}`} />
          )}

          <SubmitButton label="Cadastrar" onClick={() => {}} />
        </Form>

        <SocialMediaLinks />
      </FormContainer>
    </Container>
  );
}
