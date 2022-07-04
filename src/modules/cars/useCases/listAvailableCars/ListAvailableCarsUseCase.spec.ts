import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "car description",
            daily_rate: 150,
            licence_plate: "CBO-0584",
            fine_amount: 100,
            brand: "Chevrolet",
            category_id: "fc0fbb07-2ffa-4f14-b38c-72bc7505b75b"	
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car])         
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "car description",
            daily_rate: 150,
            licence_plate: "CBO-0584",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "fc0fbb07-2ffa-4f14-b38c-72bc7505b75b"	
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        });
        expect(cars).toEqual([car])   
    });
    
    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "car description",
            daily_rate: 150,
            licence_plate: "CBO-0584",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "fc0fbb07-2ffa-4f14-b38c-72bc7505b75b"	
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car4"
        });
        expect(cars).toEqual([car])   
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "car description",
            daily_rate: 150,
            licence_plate: "CBO-0584",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "fc0fbb07-2ffa-4f14-b38c-72bc7505b75b"	
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        });
        expect(cars).toEqual([car])   
    });
})