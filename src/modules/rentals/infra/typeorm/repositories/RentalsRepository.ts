import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findById(id: string): Promise<Rental> {
        return await this.repository.findOne(id);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({car_id});
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({user_id});
    }
    async create({
        car_id, 
        user_id, 
        expected_return_date
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date
        });

        this.repository.save(rental);

        return rental;
    }
}

export { RentalsRepository }