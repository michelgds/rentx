import { inject } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
    id: string;
    user_id: string;
}

class DevolutionRentalUseCase {
    constructor (
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}
    
    async execute({ id, user_id }:IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimumDaily = 1;

        if (!rental) {
            throw new AppError("Rental does not exists.");            
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        );

        if (daily <= 0) {
            daily = minimumDaily;
        };
        
        const devolutionDelay = this.dateProvider.compareInDays(
            dateNow, 
            rental.expected_return_date
        );
            
        let totalAmount = 0;

        if (devolutionDelay > 0) {
            const fineAmount = devolutionDelay * car.fine_amount;
            totalAmount = fineAmount;
        };

        totalAmount += daily * car.daily_rate;

        rental.end_date = dateNow;

        rental.total = totalAmount;

        await this.rentalsRepository.create(rental);
        
        await this.carsRepository.updateAvailable(car.id, true);
        
        return rental;
    }
}

export { DevolutionRentalUseCase }