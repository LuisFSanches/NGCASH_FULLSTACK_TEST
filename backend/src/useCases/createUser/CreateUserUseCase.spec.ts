import { AccountRepositoryInMemory } from "../../repositories/AccountRepository/AccountRepositoryInMemory";
import { UserRepositoryInMemory } from "../../repositories/UserRepository/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase"
import { AppError } from '../../errors/AppError';

let createUserUseCase: CreateUserUseCase;
let userRepository: UserRepositoryInMemory;
let accountRepository: AccountRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    accountRepository = new AccountRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository, accountRepository);
  })

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      username: 'John',
      password: 'Test1234'
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with an existing username", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        username: 'John',
        password: 'Test1234'
      });

      await createUserUseCase.execute({
        username: 'John',
        password: 'Test1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})