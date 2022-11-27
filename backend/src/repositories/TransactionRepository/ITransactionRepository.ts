import { Transaction } from "../../entities/Transaction";
import { ITransaction } from "../../interfaces/ITransaction";

interface ITransactionRepository {
  create(data: ITransaction): Promise<Transaction>;

  listAvailable(
    accountId: string,
    debited?: boolean, 
    credited?: boolean,
    initialDate?: Date,
    finalDate?: Date
    ): Promise<Transaction[]>;

}


export { ITransactionRepository };