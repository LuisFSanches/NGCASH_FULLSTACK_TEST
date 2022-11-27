import { dataSource } from "../../database/ormconfig";
import { Account } from "../../entities/Account";
import { Not, Repository } from "typeorm";
import { IAccountRepository } from "./IAccountRepository";

class AccountRepository implements IAccountRepository {
  
  private repository: Repository<Account>;

  constructor() {
    this.repository = dataSource.getRepository(Account);
  }

  async create(): Promise<Account> {
    const account = await this.repository.create({ balance: 100 });
    await this.repository.save(account);
    return account;
  }
  
  async getBalance(id: string): Promise<number> {
    const { balance } = await this.repository.findOneBy({ id });
    return balance;
  }

  async increaseBalance(id: string, value: number): Promise<void> {
    const account = await this.repository.findOneBy({ id });
    account.balance = account.balance + parseFloat(value as any);
    await this.repository.save(account);
  }

  async decreaseBalance(id: string, value: number): Promise<void> {
    const account = await this.repository.findOneBy({ id });
    account.balance = account.balance - parseFloat(value as any);
    await this.repository.save(account);
  }

  async listAvailable(id: string): Promise<Account[]> {
    const availableAccounts = await this.repository.find({ where: { id: Not(id)} });
    return availableAccounts;
  }

}

export { AccountRepository };