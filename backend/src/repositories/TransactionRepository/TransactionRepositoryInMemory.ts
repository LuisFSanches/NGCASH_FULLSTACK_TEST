import { AppError } from "../../errors/AppError";
import { Transaction } from "../../entities/Transaction";
import { ITransaction } from "../../interfaces/ITransaction";
import { ITransactionRepository } from "./ITransactionRepository";

class TransactionRepositoryInMemory implements ITransactionRepository {

  transactions: Transaction[] = [];

  async create(data: ITransaction): Promise<Transaction> {
    const transaction = new Transaction();

    Object.assign(transaction, data);

    this.transactions.push(transaction);

    return transaction;
  }

  async listAvailable(
    accountId: string,
    debited: boolean, 
    credited: boolean,
    initialDate: Date,
    finalDate: Date
  ): Promise<Transaction[]> {
    
    const transactions = this.transactions
      .filter(transaction => ((!debited || !credited) && transaction.debitedAccountId === accountId 
      || transaction.creditedAccountId === accountId))
      .filter(transaction => ((debited && !credited) ? transaction.debitedAccountId === accountId : transaction))
      .filter(transaction => ((credited && !debited) ? transaction.creditedAccountId === accountId : transaction))
      .filter(transaction => ((initialDate && finalDate) ? 
        transaction.created_at.getTime() >= initialDate.getTime() && transaction.created_at.getTime() <= finalDate.getTime() 
        : transaction
      ));

      return transactions;
  }
}

export { TransactionRepositoryInMemory }