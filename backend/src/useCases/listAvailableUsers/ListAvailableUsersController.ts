import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { ListAvailableUsersUseCase } from "./ListAvailableUsersUseCase";

let accountRepository = new UserRepository();

class ListAvailableUsersController {
  async handle(request:Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listAvailableUsersUseCase = new ListAvailableUsersUseCase(accountRepository);
    const availableUsers = await listAvailableUsersUseCase.execute(id);

    return response.status(200).json(availableUsers);
  }
}

export { ListAvailableUsersController };