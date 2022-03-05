import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { SpecificationsRepository } from "../../repositories/implementation/SpecificationsRepository";

const specificationRepostory = SpecificationsRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepostory);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController }