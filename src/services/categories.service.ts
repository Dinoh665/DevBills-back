import { StatusCodes } from "http-status-codes";
import { CategoriesRepository } from "../database/repositories/cateogories.repository";
import { CreateCategorieDTO } from "../dtos/categories.dto";
import { Category } from "../entities/category.entity";
import { AppError } from "../errors/app-error";

export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}
    
    async create({title, color }: CreateCategorieDTO): Promise<Category> {
        const foundCategory = await this.categoriesRepository.findByTitle(title)

        if(foundCategory) {
            throw new AppError('Category already exists', StatusCodes.BAD_REQUEST)
        }

        const category = new Category({
            title,
            color
        })

        const createdCategory = await this.categoriesRepository.create(category)
        
        return createdCategory
    }
}