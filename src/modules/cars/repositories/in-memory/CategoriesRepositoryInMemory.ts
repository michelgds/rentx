import { ICategoriesRepository } from "../ICategoriesRepository";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

class CategoriesRepositoryInMemory implements ICategoriesRepository {

  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const categories = this.categories;
    return categories;
  }

  async create({ name, description }: import("../ICategoriesRepository").ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name, description
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory }