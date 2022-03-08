import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { Specification } from "../../entities/Specification";

@injectable()
class ListSpecificationsUseCase {

  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute(): Promise<Specification[]> {
    const specification = await this.specificationsRepository.list();

    return specification;
  }
}

export { ListSpecificationsUseCase }