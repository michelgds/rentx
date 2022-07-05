import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
    });

    it('should not be able to add a new specification to a non existent car', async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id, specifications_id
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to add a new specification to a car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car5",
            description: "Description car 5",
            daily_rate: 100,
            licence_plate: "ABC-0895",
            fine_amount: 60,
            brand: "Chevrolet",
            category_id: "category"
        }); 

        const specification_id = ["12345"];
        
        await createCarSpecificationUseCase.execute({
            car_id: car.id, 
            specifications_id: specification_id
        });
    });
});