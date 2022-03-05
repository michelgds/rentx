import { ListCategoriesController } from "./ListCategoryController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";

const categoryRepository = CategoriesRepository.getInstance();
const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);
const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController }