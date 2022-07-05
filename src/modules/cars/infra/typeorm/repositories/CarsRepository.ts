import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        id,
        brand,
        category_id,
        daily_rate,
        fine_amount,
        description,
        name,
        licence_plate,
        specifications
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            id,
            brand,
            category_id,
            daily_rate,
            fine_amount,
            description,
            name,
            licence_plate,
            specifications
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicencePlate(licence_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            licence_plate
        });

        return car;
    }

    async findAvailable(
        brand?: string,
        category_id?: string, 
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this
            .repository.createQueryBuilder("c")
            .where("c.available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id);
    }
}

export { CarsRepository };