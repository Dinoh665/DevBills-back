import { CategoriesRepository } from "../database/repositories/cateogories.repository"
import { TransactionsRepository } from "../database/repositories/transaction.repository"
import { CategoryModel } from "../database/schemas/category.schema"
import { TransacitionModel } from "../database/schemas/transactions.schema"
import { TransactionService } from "../services/transactions.service"

export class TransactionsFactory {
    private static transactionsService: TransactionService

    static getServiceInstance() {
        if(this.transactionsService) {
            return this.transactionsService
        }

        const repository = new TransactionsRepository(TransacitionModel)
        const categoriesRepository = new CategoriesRepository(CategoryModel)
        const service = new TransactionService(repository, categoriesRepository)

        this.transactionsService = service

        return service
    }
}