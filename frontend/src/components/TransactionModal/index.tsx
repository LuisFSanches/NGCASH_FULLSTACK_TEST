import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

import { createTransaction } from "../../services/transactionService";
import { listUsers } from "../../services/userService";
import { CloseModalButton } from "../CloseModalButton";
import { ErrorMessage } from "../ErrorMessage";
import { Button, Container, Form, FormGroup } from "./style";

interface ITransactionModal {
  isOpen: boolean;
  onRequestClose: () => void;
  loadData: () => void;
}

interface INewTransaction {
  creditedAccountId: string;
  value: number;
}

interface IUsers {
  id: string;
  accountId: string;
  username: string;
}

export function TransactionModal({
  isOpen,
  onRequestClose,
  loadData,
}: ITransactionModal) {
  const [users, setUsers] = useState<IUsers[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<INewTransaction>();

  const handleNewTransaction = async ({
    creditedAccountId,
    value,
  }: INewTransaction) => {
    try {
      await createTransaction(creditedAccountId, value);
      onRequestClose();
      loadData();
    } catch (err) {
      const { response } = err as AxiosError;
      if (response?.status === 400) {
        return setError("value", {
          type: "custom",
          message: "Saldo insuficiente",
        });
      }

      if (response?.status === 500) {
        return setError("value", {
          type: "custom",
          message: "Ocorreu um erro, tente novamente mais tarde",
        });
      }
    }
  };

  const loadAvailableUsers = async () => {
    if (!isOpen) return;
    const { data: users } = await listUsers();
    setUsers(users);
  };

  useEffect(() => {
    reset();
    loadAvailableUsers();
  }, [isOpen === true]);

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
        <h2>
          <FontAwesomeIcon icon={faMoneyBillTransfer} /> Nova Transferência
        </h2>

        <Form onSubmit={handleSubmit(handleNewTransaction)}>
          <FormGroup>
            <label htmlFor="">Usuário</label>
            <select {...register("creditedAccountId")}>
              {users.map(({ accountId, username }) => (
                <option value={accountId}>{username}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Valor</label>
            <input
              type="number"
              {...register("value", {
                min: 1,
                required: "Digite um valor válido",
              })}
            />
          </FormGroup>

          {errors.value?.message && (
            <ErrorMessage message={`${errors.value?.message}`} />
          )}

          <Button>Transferir</Button>
        </Form>
      </Container>
    </Modal>
  );
}
