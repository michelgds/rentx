import { ICarsImage } from "@modules/cars/repositories/ICarsImage";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";


class CarsImageRepository implements ICarsImage {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name
        });

        await this.repository.save(carImage);

        return carImage;
    }

}

export { CarsImageRepository }