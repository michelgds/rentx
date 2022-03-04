import { ListCategoriesController } from "./ListCategoryController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

const categoryRepository = new CategoriesRepository();
const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);
const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController }