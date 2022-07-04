import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("User isn't admin.");
    }

    next();
}