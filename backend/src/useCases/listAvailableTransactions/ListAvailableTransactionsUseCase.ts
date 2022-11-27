import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/TransactionRepository/ITransactionRepository";

interface IRequest {
  accountId: string;
  debited?: boolean;
  credited?: boolean;
  initialDate?: Date;
  finalDate?: Date
}

class ListAvailableTransactionsUseCase {
  constructor(private userRepository: ITransactionRepository) {}

  async execute({
    accountId,
    debited,
    credited,
    initialDate,
    finalDate,
    }: IRequest): Promise<Transaction[]> {

    const availableTransactions = await this.userRepository.listAvailable(
      accountId,
      debited,
      credited,
      initialDate,
      finalDate
    );

    return availableTransactions;
  }
}

export { ListAvailableTransactionsUseCase };