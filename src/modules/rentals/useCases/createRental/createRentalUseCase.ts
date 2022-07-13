import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({
        user_id, 
        car_id, 
        expected_return_date
    }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car isn't available.");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There is a rental in progress for that user.");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    }
}

export { CreateRentalUseCase } 