import { User } from "../../entities/User";
import { IUser } from "../../interfaces/IUser";

interface IUserRepository {
  create(data: IUser): Promise<User>;

  findByUsername(username: string): Promise<User>;

  findById(id: string): Promise<User>;

  listAvailable(id: string): Promise<User[]>;

}

export { IUserRepository };