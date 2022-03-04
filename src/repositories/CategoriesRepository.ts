import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: String,
  description: String
}

class CategoriesRepository {
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