import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../entities/Category";


class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
  }

  execute(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}

export { ListCategoriesUseCase }