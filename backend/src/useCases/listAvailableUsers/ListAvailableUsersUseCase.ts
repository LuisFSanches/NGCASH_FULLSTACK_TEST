import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";


class ListAvailableUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User[]> {
    const availableUsers = this.userRepository.listAvailable(id);
    return availableUsers;
  }
}

export { ListAvailableUsersUseCase };