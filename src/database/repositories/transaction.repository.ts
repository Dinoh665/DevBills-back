import { CreateCategorieDTO } from "../../dtos/categories.dto"
import { Transaction } from "../../entities/transactions.entity"
import { TransacitionModel } from "../schemas/transactions.schema"

export class TransactionsRepository {
    constructor(private model: typeof TransacitionModel) {}

    
    async create({ title, date, amount, type, category }: Transaction): Promise<Transaction> {
        const createdTransaction = await this.model.create({ title, date, amount, type, category })

        return createdTransaction.toObject<Transaction>()
    }

    
    async index(): Promise<Transaction[]> {
        const transactions = await this.model.find()

        const transactionsMap = transactions.map(item => item.toObject<Transaction>())

        return transactionsMap
    }
}