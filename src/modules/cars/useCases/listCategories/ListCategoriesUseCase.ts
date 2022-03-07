import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../entities/Category";


class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
  }

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase }