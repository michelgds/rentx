
import { Specification } from "../../model/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date()
    });

    this.specifications.push(specification);
  }
  
  findByName(name: String): Specification {
    return this.specifications.find(specification => specification.name === name);
  }
}

export { SpecificationsRepository }