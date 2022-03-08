
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";
import { Repository, getRepository } from "typeorm";


class SpecificationsRepository implements ISpecificationsRepository {

  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    });

    await this.repository.save(specification);
  }

async findByName(name: String): Promise<Specification> {
    const specifications = await this.repository.findOne({ name });
    return specifications;
  }
}

export { SpecificationsRepository }