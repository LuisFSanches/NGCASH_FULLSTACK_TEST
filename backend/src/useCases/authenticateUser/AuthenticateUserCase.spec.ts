import { IUser } from "../../interfaces/IUser";
import { AccountRepositoryInMemory } from "../../repositories/AccountRepository/AccountRepositoryInMemory";
import { UserRepositoryInMemory } from "../../repositories/UserRepository/UserRepositoryInMemory"
import { CreateUserUseCase } from "../../useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AppError } from '../../errors/AppError';

let userRepositoryInMemory: UserRepositoryInMemory;
let accountRepositoryInMemory: AccountRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    accountRepositoryInMemory = new AccountRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory, accountRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: IUser = {
      username: 'John',
      password: 'Test1234'
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      username: user.username,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        username: "FakeUser",
        password: "Test1234"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with an incorrect password", () => {
    expect(async () => {
      const user: IUser = {
        username: "FakeUser",
        password: "Test1234",
      }
  
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        username: "FakeUser",
        password: "Test1235"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})