import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: String;
  description: String;
}
interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: String): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository , ICreateSpecificationDTO }