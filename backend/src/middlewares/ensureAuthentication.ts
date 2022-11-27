import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("Token missing", 401);

  const token = authHeader.split(" ")[1];

  try {
    const { sub: userId } = verify(token, `${ process.env.SECRET_TOKEN }`) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(userId);

    if (!user) throw new AppError("User does not exist", 401);

    request.user = {
      id: userId,
      accountId: user.accountId
    };

    next();

  } catch {
    throw new AppError("Invalid token!", 401);
  }
}