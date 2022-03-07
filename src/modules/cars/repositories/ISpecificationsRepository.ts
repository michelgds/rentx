import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: String;
  description: String;
}
interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: String): Specification;
}

export { ISpecificationRepository, ICreateSpecificationDTO }