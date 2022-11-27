import { Message } from "./style";

interface IErrorMessage {
  message: string;
}

export function ErrorMessage({ message }: IErrorMessage) {
  return <Message>{message}</Message>;
}
