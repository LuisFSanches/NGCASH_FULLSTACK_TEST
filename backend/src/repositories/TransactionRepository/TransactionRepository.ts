import { dataSource } from "../../database/ormconfig";
import { Transaction } from "../../entities/Transaction";
import { ITransaction } from "../../interfaces/ITransaction";
import { Between, Repository } from "typeorm";
import { ITransactionRepository } from "./ITransactionRepository";

class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = dataSource.getRepository(Transaction);
  }

  async create(data: ITransaction): Promise<Transaction> {
    const { debitedAccountId, creditedAccountId, value } = data;

    const transaction = this.repository.create({
      debitedAccountId,
      creditedAccountId,
      value
    });

    await this.repository.save(transaction);
    
    return transaction;
  }

  async listAvailable(
    accountId: string,
    debited: boolean, 
    credited: boolean,
    initialDate: Date,
    finalDate: Date
    ): Promise<Transaction[]> {
    
    const transactionQuery = dataSource.createQueryBuilder(Transaction, 'transaction')
    .innerJoinAndSelect("transaction.debitedAccount", "d")
    .innerJoinAndSelect("transaction.creditedAccount", "c")
    .where({})
    
    if ((!debited && !credited) || (debited && credited)) {
      transactionQuery.andWhere([{ debitedAccountId: accountId }, {creditedAccountId: accountId}])
    }

    if (debited && !credited) {
      transactionQuery.andWhere({ debitedAccountId: accountId })
    }

    if (credited && !debited) {
      transactionQuery.andWhere({ creditedAccountId: accountId })
    }

    if (initialDate && finalDate) {
      transactionQuery.andWhere({ created_at: Between(initialDate, finalDate) })
    }
    
    const availableTransactions = await transactionQuery.getMany();
    return availableTransactions;
  }

}

export { TransactionRepository };