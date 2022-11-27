import { useForm } from "react-hook-form";
import Modal from "react-modal";

import { ActionButton } from "../ActionButton";
import { CloseModalButton } from "../CloseModalButton";
import { ErrorMessage } from "../ErrorMessage";
import { ActionContainer, Container, Form, FormGroup } from "./style";

interface ITransactionModal {
  isOpen: boolean;
  onRequestClose: () => void;
  loadTransactions: (params: string) => void;
}

interface INewFilter {
  status: string;
  initialDate: string;
  finalDate: string;
}

export function FilterModal({
  isOpen,
  onRequestClose,
  loadTransactions,
}: ITransactionModal) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<INewFilter>();

  const handleFilterTransactions = ({
    status,
    initialDate,
    finalDate,
  }: INewFilter) => {
    if (initialDate && !finalDate) {
      return setError("finalDate", {
        type: "custom",
        message: "Selecione uma data final",
      });
    }

    if (finalDate && !initialDate) {
      return setError("initialDate", {
        type: "custom",
        message: "Selecione uma data inicial",
      });
    }

    const params =
      (status ? `${status}=true` : "") +
      (initialDate ? `&initialDate=${initialDate}` : "") +
      (finalDate ? `&finalDate=${finalDate}` : "");
    console.log(params);
    onRequestClose();
    loadTransactions(params);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      appElement={document.getElementById("root") || undefined}
    >
      <CloseModalButton onRequestClose={onRequestClose} />
      <Container>
        <h2>Filtar Transferências</h2>
        <Form onSubmit={handleSubmit(handleFilterTransactions)}>
          <FormGroup>
            <label>Recebido / Enviado</label>
            <select {...register("status")}>
              <option value="">Todas</option>
              <option value="debited">Transações Recebidas</option>
              <option value="credited">Transações Enviadas</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Data Inicial</label>
            <input type="date" {...register("initialDate")} />
            <ErrorMessage message={`${errors.initialDate?.message || ""}`} />
          </FormGroup>

          <FormGroup>
            <label>Data Final</label>
            <input type="date" {...register("finalDate")} />
            <ErrorMessage message={`${errors.finalDate?.message || ""}`} />
          </FormGroup>
          <ActionContainer>
            <ActionButton
              label="Limpar"
              color="#D2DFE5"
              onClick={() => reset()}
            />
            <ActionButton label="Filtrar" color="#04d361" onClick={() => {}} />
          </ActionContainer>
        </Form>
      </Container>
    </Modal>
  );
}
