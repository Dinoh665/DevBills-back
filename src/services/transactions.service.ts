import { StatusCodes } from "http-status-codes";
import { CategoriesRepository } from "../database/repositories/cateogories.repository";
import { TransactionsRepository } from "../database/repositories/transaction.repository";
import { CreateTransactionDTO } from "../dtos/transactions.dto";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app-error";
import { IndexTransactionsDTO } from "../dtos/transactions.dto";


export class TransactionService {
    constructor(private transactionsRepository: TransactionsRepository, private categoriesRepository: CategoriesRepository) {}

    async create({
        title,
        type, 
        date, 
        categoryId, 
        amount
    }: CreateTransactionDTO): Promise<Transaction> {

        const category = await this.categoriesRepository.findById(categoryId)

        if(!category) {
            throw new AppError('Category does not exists', StatusCodes.NOT_FOUND)
        }

        const transaction = new Transaction({
            title,
            type,
            date,
            category,
            amount
        })

        const createdTransaction = await this.transactionsRepository.create(transaction)

        return createdTransaction
    }

    async index(filters: IndexTransactionsDTO): Promise<Transaction[]> {
        const transactions = await this.transactionsRepository.index(filters)

        return transactions
    }
}