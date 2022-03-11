import { User } from "../../infra/typeorm/entities/User"
import { IUsersRepository } from "../IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UserRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({driver_licence, email, name, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_licence,
      email,
      name, 
      password
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory }