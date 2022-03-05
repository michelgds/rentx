import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryuseCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryuseCase();
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController }