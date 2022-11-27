import { AppError } from "../../errors/AppError";
import { IAccountRepository } from "repositories/AccountRepository/IAccountRepository";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/TransactionRepository/ITransactionRepository";

interface IRequest {
  accountId: string;
  creditedAccountId: string;
  value: number;
}

class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private accountRepository: IAccountRepository
  ) {}

  async execute({ accountId, creditedAccountId, value }: IRequest): Promise<Transaction> {
    const balance = await this.accountRepository.getBalance(accountId);

    if (balance < value) throw new AppError('Insufficient amount');

    if (accountId === creditedAccountId) throw new AppError('Invalid credited account');
    
    const transaction = await this.transactionRepository.create({
      debitedAccountId: accountId,
      creditedAccountId,
      value
    });

    await this.accountRepository.decreaseBalance(accountId, value);
    await this.accountRepository.increaseBalance(creditedAccountId, value);

    return transaction;
  }
}

export { CreateTransactionUseCase };