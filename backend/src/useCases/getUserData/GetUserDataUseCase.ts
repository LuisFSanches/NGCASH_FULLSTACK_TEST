import { User } from "../../entities/User";
import { IUserRepository } from "repositories/UserRepository/IUserRepository";
import { AppError } from "../../errors/AppError";

class GetUserDataUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new AppError("User not found");

    return user;
  }
}

export { GetUserDataUseCase };