import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository = new UserRepository();

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

    const token = await authenticateUserUseCase.execute({
      username,
      password
    });

    return response.json(token);

  }
}

export { AuthenticateUserController };