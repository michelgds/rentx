import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImage {
    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImage }