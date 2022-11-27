import { Account } from "../../entities/Account";
import { IAccountRepository } from "./IAccountRepository";

class AccountRepositoryInMemory implements IAccountRepository {

  accounts: Account[] = [];

  async create(): Promise<Account> {
    const account = new Account();

    Object.assign(account, { balance: 100 });

    this.accounts.push(account);

    return account;
  }

  async getBalance(id: string): Promise<number> {
    const { balance } = this.accounts.find(account => account.id === id);
    return balance;
  }

  async increaseBalance(id: string, value: number): Promise<void> {
    const { balance } = this.accounts.find(account => account.id === id);
    const newBalance = balance + value;

    this.accounts.map((account) => { 
      if (account.id === id) {
        return {...account, newBalance}
      }
      return account;
    })
    
  }

  async decreaseBalance(id: string, value: number): Promise<void> {
    const { balance } = this.accounts.find(account => account.id === id);
    const newBalance = balance - value;

    this.accounts.map((account) => { 
      if (account.id === id) {
        return {...account, newBalance}
      }
      return account;
    });
  }

  async listAvailable(id: string): Promise<Account[]> {
    const availableAccounts = this.accounts.filter(account => account.id !== id);
    return availableAccounts;
  }

}

export { AccountRepositoryInMemory };