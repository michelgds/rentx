import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";
import { Category } from "../model/Category";

class PostgresCategoriesRepository implements ICategoriesRepository {

  findByName(name: String): Category {
    console.log();
    return null;
  }
  list(): Category[] {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }

}

export { PostgresCategoriesRepository }