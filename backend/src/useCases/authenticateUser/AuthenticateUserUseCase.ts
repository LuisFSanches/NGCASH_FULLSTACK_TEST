import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { AppError } from "../../errors/AppError";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse { 
  token: string;
  username: string;
}

class AuthenticateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new AppError('Invalid username or password');

    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) throw new AppError('Invalid username or password');

    const token = sign({}, `${process.env.SECRET_TOKEN}`, {
      subject: user.id,
      expiresIn: '1d'
    });

    const tokenReturn: IResponse = {
      token,
      username: user.username
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };