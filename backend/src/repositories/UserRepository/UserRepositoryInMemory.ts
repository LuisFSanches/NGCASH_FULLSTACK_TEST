import { User } from "../../entities/User";
import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "./IUserRepository";

class UserRepositoryInMemory implements IUserRepository {

  users: User[] = [];

  async create(data: IUser): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find(user => user.username === username);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async listAvailable(id: string): Promise<User[]> {
    const availableUsers = this.users.filter(user => user.id !== id);
    return availableUsers;
  }

}

export { UserRepositoryInMemory };