import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, driver_licence } = request.body;

    const createUseruseCase = container.resolve(CreateUserUseCase);

    await createUseruseCase.execute({
      name,
      username,
      email,
      password,
      driver_licence
    });

    return response.status(201).send();
  }
}

export { CreateUserController }