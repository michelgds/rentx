import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

dayjs.extend(utc);

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
        const minimumHoursForRent = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car isn't available.");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There is a rental in progress for that user.");
        }

        const expectedReturnDateFormatted = dayjs(expected_return_date).utc().local().format();

        const dateNow = dayjs().utc().local().format();
        
        const compare = dayjs(expectedReturnDateFormatted).diff(dateNow, "hour");
        
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