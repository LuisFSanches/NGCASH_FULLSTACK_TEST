import { UserRepositoryInMemory } from "../../repositories/UserRepository/UserRepositoryInMemory"
import { GetUserDataUseCase } from "./GetUserDataUseCase";
import { AppError } from '../../errors/AppError';

let userRepository: UserRepositoryInMemory;
let getUserDataUseCase: GetUserDataUseCase;

describe("Get user data", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    getUserDataUseCase = new GetUserDataUseCase(userRepository);
  })

  it("should return the data of the user", async() => {
    const user = await userRepository.create({
      username: 'John',
      password: 'Test1234'
    });

    const checkUser = await getUserDataUseCase.execute(user.id);
    expect(checkUser).toHaveProperty("id");
  });

  it("should not return the data of a user", async () => {
    expect(async () => {
      const user = await userRepository.create({
        username: 'John',
        password: 'Test1234'
      });

      const id = `${user.id}123`;

      return await getUserDataUseCase.execute(id);

    }).rejects.toBeInstanceOf(AppError)
  })
})