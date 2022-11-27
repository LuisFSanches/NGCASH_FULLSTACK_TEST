import { AccountRepositoryInMemory } from "../../repositories/AccountRepository/AccountRepositoryInMemory";
import { TransactionRepositoryInMemory } from "../../repositories/TransactionRepository/TransactionRepositoryInMemory";
import { UserRepositoryInMemory } from "../../repositories/UserRepository/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../useCases/createUser/CreateUserUseCase";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";
import { AppError } from '../../errors/AppError';

let userRepository: UserRepositoryInMemory;
let accountRepository: AccountRepositoryInMemory;
let transactionRepository: TransactionRepositoryInMemory;
let createTransactionUseCase: CreateTransactionUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Create Transaction", () => {
  beforeEach(() => {
    transactionRepository = new TransactionRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    accountRepository = new AccountRepositoryInMemory();
    createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, accountRepository);
    createUserUseCase = new CreateUserUseCase(userRepository, accountRepository);
  })

  it("should be able to create a transaction", async () => {
    const user = await createUserUseCase.execute({
      username: 'John',
      password: 'Test1234'
    });

    const creditedUser = await createUserUseCase.execute({
      username: 'Mary',
      password: 'Test1234'
    });

    const transaction = await createTransactionUseCase.execute({
      accountId: user.accountId,
      creditedAccountId: creditedUser.accountId,
      value: 50
    });

    expect(transaction).toHaveProperty("id");
  });

  it("should not be able to create a transaction if the value is higher than the amount in account", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        username: 'John',
        password: 'Test1234'
      });
  
      const creditedUser = await createUserUseCase.execute({
        username: 'Mary',
        password: 'Test1234'
      });
  
      await createTransactionUseCase.execute({
        accountId: user.accountId,
        creditedAccountId: creditedUser.accountId,
        value: 200
      });
    }).rejects.toBeInstanceOf(AppError);

  });
})