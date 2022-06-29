import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect.", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect.", 401);
    }

    const token = sign({}, "b5a7da55afbde0978b5d3ae30eccd121", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }