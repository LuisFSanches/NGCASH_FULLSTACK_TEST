import { Request, Response } from "express";
import { TransactionRepository } from "../../repositories/TransactionRepository/TransactionRepository";
import { ListAvailableTransactionsUseCase } from "./ListAvailableTransactionsUseCase";

let transactionRepository = new TransactionRepository();

class ListAvailableTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.user;
    const { debited, credited, initialDate, finalDate } = request.query;
    const listAvailableTransactionsUseCase = new ListAvailableTransactionsUseCase(transactionRepository);

    const availableTransactions = await listAvailableTransactionsUseCase.execute({
      accountId,
      debited: debited === "true" ? true : false,
      credited: credited === "true" ? true : false,
      initialDate: initialDate && new Date(initialDate as string),
      finalDate: finalDate && new Date(finalDate as string)
    });

    return response.status(200).json(availableTransactions);
  }
}

export { ListAvailableTransactionsController }