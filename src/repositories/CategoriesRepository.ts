import { Category } from "../modules/cars/model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../modules/cars/repositories/ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository{
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      description,
      name,
      createdAt: new Date()
    })

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: String): Category {
    return this.categories.find(category => category.name === name);    
  }
}

export { CategoriesRepository }