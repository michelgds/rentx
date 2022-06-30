import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Corsa",
            description: "Carro compacto e potente",
            daily_rate: 100,
            licence_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Chevrolet",
            category_id: "category"
        });
        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with existing licence_plate", () => {
        const licence_plate = "ABC-5678";

        expect(async () => {
            
            await createCarUseCase.execute({
                name: "Car1",
                description: "Description car 1",
                daily_rate: 100,
                licence_plate: licence_plate,
                fine_amount: 60,
                brand: "Chevrolet",
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "Description car 2",
                daily_rate: 120,
                licence_plate: licence_plate,
                fine_amount: 50,
                brand: "Chevrolet",
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car with available true by default.", async () => {
        const car = await createCarUseCase.execute({
            name: "Car3",
            description: "Description car 3",
            daily_rate: 100,
            licence_plate: "ABC-0895",
            fine_amount: 60,
            brand: "Chevrolet",
            category_id: "category"
        });        
        expect(car.available).toBe(true);
    });
});