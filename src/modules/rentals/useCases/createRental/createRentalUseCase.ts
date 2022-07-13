import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute({
        user_id, 
        car_id, 
        expected_return_date
    }: IRequest): Promise<Rental> {
        const minimumHoursForRent = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car isn't available.");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There is a rental in progress for that user.");
        }

        const dateNow = this.dateProvider.dateNow();
        
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);
        
        if (compare < minimumHoursForRent) {
            throw new AppError("Invalid return date.");            
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