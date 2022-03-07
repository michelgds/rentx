import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

import { injectable, inject } from "tsyringe";

interface IRequest {
  name: String;
  description: String;
}

@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists.");
    }

    this.specificationsRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationUseCase }