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
}

export { CategoriesRepository }