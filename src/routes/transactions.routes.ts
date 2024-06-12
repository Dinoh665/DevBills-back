import { Router } from "express";
import { ParamsType, validator } from "../middlewares/validator.middleware";
import { createTransactionsSchema } from "../dtos/transactions.dto";
import { TransactionsFactory } from "../factories/transactions.factory";
import { TransactionController } from "../controllers/transaction.controller";


export const transactionsRoutes = Router()

const controller = new TransactionController(TransactionsFactory.getServiceInstance())

transactionsRoutes.post('/', validator({
    schema: createTransactionsSchema,
    type: ParamsType.BODY
}), controller.create)
