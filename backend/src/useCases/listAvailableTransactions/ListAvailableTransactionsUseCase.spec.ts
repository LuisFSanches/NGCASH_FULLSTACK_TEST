import { UserRepositoryInMemory } from "../../repositories/UserRepository/UserRepositoryInMemory";
import { TransactionRepositoryInMemory } from "../../repositories/TransactionRepository/TransactionRepositoryInMemory"
import { ListAvailableTransactionsUseCase } from "./ListAvailableTransactionsUseCase";
import { User } from "../../entities/User";

let transactionRepository: TransactionRepositoryInMemory;
let listAvailableTransactionsUseCase: ListAvailableTransactionsUseCase;
let userRepository: UserRepositoryInMemory;

let john: User;
let mary: User;

describe("List available transactions", () => {
  beforeEach(async () => {
    transactionRepository = new TransactionRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    listAvailableTransactionsUseCase = new ListAvailableTransactionsUseCase(transactionRepository);

    john = await userRepository.create({
      username: 'John',
      password: 'Test1234'
    });

    mary = await userRepository.create({
      username: 'Mary',
      password: 'Test1234'
    });

    await transactionRepository.create({
      debitedAccountId: john.accountId,
      creditedAccountId: mary.accountId,
      value: 30
    });
  });

  it("should list all transactions from the user", async () => {

    const transactions = await listAvailableTransactionsUseCase.execute({
      accountId: john.accountId
    });

    expect(transactions.length).toBe(1);
    
  });

  it("should list only the debited transactions", async () => {

    const michael = await userRepository.create({
      username: 'Michael',
      password: 'Test1234'
    });

    await transactionRepository.create({
      debitedAccountId: michael.accountId,
      creditedAccountId: john.accountId,
      value: 30
    });

    const transactions = await listAvailableTransactionsUseCase.execute({
      accountId: john.accountId,
      debited: true
    });

    expect(transactions.length).toBe(1);
    
  });

  it("should list only the credited transactions", async () => {

    const michael = await userRepository.create({
      username: 'Michael',
      password: 'Test1234'
    });

    await transactionRepository.create({
      debitedAccountId: michael.accountId,
      creditedAccountId: john.accountId,
      value: 30
    });

    const transactions = await listAvailableTransactionsUseCase.execute({
      accountId: john.accountId,
      credited: true
    });

    expect(transactions.length).toBe(1);
    
  })
})