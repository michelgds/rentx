
import { Category } from "../modules/cars/model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../modules/cars/repositories/ICategoriesRepository";

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