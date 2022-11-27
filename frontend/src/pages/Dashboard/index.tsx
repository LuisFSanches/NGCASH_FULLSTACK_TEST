/* eslint-disable import-helpers/order-imports */
import moment from "moment";
import "moment/dist/locale/pt-br";

import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faFilter,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";

import { useState, useEffect } from "react";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TransactionCard } from "../../components/TransactionCard";
import { TransactionModal } from "../../components/TransactionModal";
import { listTransaction } from "../../services/transactionService";
import { getUserData } from "../../services/userService";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  ActionButtonsContainer,
  Cards,
  Container,
  ContainerBody,
  EmptyWalletContainer,
  Table,
  TableContainer,
} from "./style";
import { FilterModal } from "../../components/FilterModal";
import { ActionButton } from "../../components/ActionButton";
import emptyWallet from "../../assets/images/empty-wallet.png";
import { LoadingContainer } from "../../components/Loading";

interface ITransaction {
  id: string;
  creditedAccountId: string;
  debitedAccountId: string;
  value: number;
  created_at: Date;
}

interface IUserData {
  id: string;
  username: string;
  accountId: string;
  account: {
    id: string;
    balance: number;
    created_at: Date;
  };
  created_at: string;
}

export function Dashboard() {
  const [transactionModal, setTransactionModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [userData, setUserData] = useState<IUserData>();
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useBreakpoint(down("sm"));

  const loadUserData = async (): Promise<void> => {
    const { data: userData } = await getUserData();
    setUserData(userData);
  };

  const loadTransactions = async (params: string): Promise<void> => {
    const { data: transactions } = await listTransaction(params);
    setTransactions(transactions);
  };

  const loadData = (params = "") => {
    loadUserData();
    loadTransactions(params);
    setTimeout(() => setLoading(false), 300);
  };

  useEffect(() => {
    loadData();
  }, []);

  const debitedTransactions = transactions.filter(
    (transaction) => transaction.debitedAccountId === userData?.accountId
  ).length;

  const creditedTransactions = transactions.filter(
    (transaction) => transaction.creditedAccountId === userData?.accountId
  ).length;

  if (loading) return <LoadingContainer />;

  return (
    <Container>
      <Header
        username={userData?.username || ""}
        balance={userData?.account.balance || 0}
      />
      <ContainerBody>
        <Cards>
          <TransactionCard
            label="Transferências totais"
            value={transactions.length}
          />
          <TransactionCard
            label="Transferências Recebidas"
            value={creditedTransactions}
          />
          <TransactionCard
            label="Transferências Realizadas"
            value={debitedTransactions}
          />
        </Cards>

        <ActionButtonsContainer>
          <ActionButton
            label="Transferir"
            color="#04d361"
            icon={faMoneyBillTransfer}
            onClick={() => setTransactionModal(true)}
            style={{ marginRight: "10px" }}
          />
          <ActionButton
            label="Filtrar"
            color="#bbc6cc"
            icon={faFilter}
            onClick={() => setFilterModal(true)}
          />
        </ActionButtonsContainer>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Valor</th>
                <th>Recebido/Enviado</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(
                (
                  { value: originalValue, debitedAccountId, created_at },
                  index
                ) => {
                  const value =
                    debitedAccountId === userData?.accountId
                      ? originalValue * -1
                      : originalValue;

                  const status =
                    debitedAccountId === userData?.accountId
                      ? "Enviado"
                      : "Recebido";
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td className={value > 0 ? "credited" : "debited"}>
                        {formatCurrency(value)}
                      </td>
                      <td
                        className={
                          status === "Recebido" ? "checkIn" : "checkOut"
                        }
                      >
                        <FontAwesomeIcon
                          icon={
                            status === "Recebido"
                              ? faCircleArrowRight
                              : faCircleArrowLeft
                          }
                        />
                        <span>{status}</span>
                      </td>
                      <td>
                        {isMobile
                          ? moment(created_at).format("l")
                          : moment(created_at).format("ll")}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
          {transactions.length === 0 && (
            <EmptyWalletContainer>
              <img src={emptyWallet} alt="empty-wallet" />
              <span style={{ marginTop: "5rem" }}>
                Você ainda não possui transferências.
              </span>
            </EmptyWalletContainer>
          )}
        </TableContainer>
      </ContainerBody>

      <TransactionModal
        isOpen={transactionModal}
        onRequestClose={() => setTransactionModal(false)}
        loadData={loadData}
      />

      <FilterModal
        isOpen={filterModal}
        onRequestClose={() => setFilterModal(false)}
        loadTransactions={loadTransactions}
      />

      <Footer />
    </Container>
  );
}
