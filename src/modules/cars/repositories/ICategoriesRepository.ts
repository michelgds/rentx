import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: String,
  description: String
}

interface ICategoriesRepository {
  findByName(name: String): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO }