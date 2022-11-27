import { Request, Response } from "express";
import { AccountRepository } from "../../repositories/AccountRepository/AccountRepository";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepository = new UserRepository();
let accountRepository = new AccountRepository();

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    
    const createUserUseCase = new CreateUserUseCase(userRepository, accountRepository);
    
    const {id, username: user, accountId, created_at} = await createUserUseCase.execute({
      username,
      password
    });
    
    return response.status(201).send({
      id,
      username: user,
      accountId,
      created_at
    });
  }
}

export { CreateUserController };