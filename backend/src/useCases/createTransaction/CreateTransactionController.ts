import { Request, Response } from "express";
import { AccountRepository } from "../../repositories/AccountRepository/AccountRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository/TransactionRepository";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

let transactionRepository = new TransactionRepository();
let accountRepository = new AccountRepository();

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.user;

    const { creditedAccountId, value } = request.body;

    const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, accountRepository)

    const transaction = await createTransactionUseCase.execute({
      accountId,
      creditedAccountId,
      value
    });

    return response.status(201).json(transaction);
  }

}

export { CreateTransactionController };