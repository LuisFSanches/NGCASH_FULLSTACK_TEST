import { Account } from "../../entities/Account"

interface IAccountRepository {
  create(): Promise<Account>;

  getBalance(id: string): Promise<number>;

  increaseBalance(id: string, value: number): Promise<void>;

  decreaseBalance(id: string, value: number): Promise<void>;

  listAvailable(id: string): Promise<Account[]>;
}

export { IAccountRepository }