import { ListCategoriesController } from "./ListCategoryController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";

export default (): ListCategoriesController => {
  const categoryRepository = new CategoriesRepository();
  const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);
  const listCategoryController = new ListCategoriesController(listCategoryUseCase);

  return listCategoryController;
}