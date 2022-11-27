import { IAccountRepository } from "../../repositories/AccountRepository/IAccountRepository";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { userValidation } from "../../utils/ValidateUserData";

import { hash } from "bcrypt";
import { AppError } from "../../errors/AppError";

class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private accountRepository: IAccountRepository
  ) {}

  async execute({ username, password }: IUser): Promise<User> {
    const { userRepository, accountRepository } = this;
    
    const validation = userValidation.validate({ username, password });
    
    if (validation.error) throw new AppError("Invalid username or password");
    
    const checkUser = await userRepository.findByUsername(username);
    
    if (checkUser) throw new AppError("Username already exists", 409);

    const account = await accountRepository.create();

    const hashedPassword = await hash(password, 8);

    const user = await userRepository.create({
      username,
      password: hashedPassword,
      accountId: account.id
    });
    
    return user;
  }
}

export { CreateUserUseCase }