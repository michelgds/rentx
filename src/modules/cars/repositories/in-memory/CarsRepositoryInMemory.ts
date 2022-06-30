import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        name,
        licence_plate
    }: ICreateCarDTO): Promise<void> {
        const category = new Car();

        Object.assign(category, {
            brand,
            category_id,
            daily_rate,
            description,
            name,
            licence_plate
        });

        this.cars.push()
    }
}

export { CarsRepositoryInMemory };