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
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        
        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            description,
            name,
            licence_plate
        });
        
        this.cars.push(car);

        return car;
    }

    async findByLicencePlate(licence_plate: string): Promise<Car> {
        return this.cars.find((car) => car.licence_plate === licence_plate);
    }
}

export { CarsRepositoryInMemory };