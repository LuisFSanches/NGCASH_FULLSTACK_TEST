import { Router } from "express";
import { ListAvailableTransactionsController } from "../useCases/listAvailableTransactions/ListAvailableTransactionsController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateTransactionController } from "../useCases/createTransaction/CreateTransactionController";

const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();
const listAvailableTransactionsController = new ListAvailableTransactionsController();

transactionRoutes.post("/create", ensureAuthentication, createTransactionController.handle);
transactionRoutes.get("/list", ensureAuthentication, listAvailableTransactionsController.handle);

export { transactionRoutes };