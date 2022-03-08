import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase   = container.resolve(ListSpecificationUseCase);

    const specifications = await listSpecificationsUseCase.execute();

    return response.json(specifications);
  }
}

export { ListSpecificationsController }