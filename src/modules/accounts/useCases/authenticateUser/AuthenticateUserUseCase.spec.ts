import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_licence: "00123",
      email: "user@test.com",
      password: "1234",
      name: "User test"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a non existing user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong@mail.com",
        password: "1234"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorrect passord", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_licence: "00123",
        email: "user@test.com",
        password: "1234",
        name: "User test"
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "12345"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
