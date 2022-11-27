import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { GetUserDataUseCase } from "./GetUserDataUseCase";

let userRepository = new UserRepository();

class GetUserDataController {
  async handle(request:Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserData = new GetUserDataUseCase(userRepository);
    const user = await getUserData.execute(id);

    return response.status(200).json(user);
  }
}

export { GetUserDataController }