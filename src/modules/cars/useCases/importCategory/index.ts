import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryuseCase } from "./ImportCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryuseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController }