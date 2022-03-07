
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.specifications = [];
  }

  public static getInstance() {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
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