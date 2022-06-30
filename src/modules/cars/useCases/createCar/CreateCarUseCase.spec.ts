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
        await createCarUseCase.execute({
            name: "Corsa",
            description: "Carro compacto e potente",
            daily_rate: 100,
            licence_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Chevrolet",
            category_id: "category"
        });
    })
})