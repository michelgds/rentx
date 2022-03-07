import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";


export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  const importCategoryController = new ImportCategoryController(importCategoryUseCase);

  return importCategoryController;
}