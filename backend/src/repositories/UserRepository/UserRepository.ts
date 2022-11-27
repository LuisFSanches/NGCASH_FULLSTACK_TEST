import { dataSource } from "../../database/ormconfig";
import { User } from "../../entities/User";
import { Not, Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create(data: User): Promise<User> {

    const { username, password, accountId } = data;

    const user = this.repository.create({
      username,
      password,
      accountId
    });
    
    await this.repository.save(user);
    return user;

  }
  
  async findByUsername(username: string): Promise<User> {

    const user = await this.repository.findOneBy({ username });

    return user;
  }

  async findById(id: string): Promise<User> {

    const user = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        created_at: true,
        accountId: true
      }
    });

    return user;
  }

  async listAvailable(id: string): Promise<User[]> {

    const availableUsers = await dataSource.createQueryBuilder(User, 'user')
      .select(["user.id", "user.username", "user.accountId"])
      .where({ id: Not(id) })
      .getMany();

    return availableUsers;
  }
}

export { UserRepository };