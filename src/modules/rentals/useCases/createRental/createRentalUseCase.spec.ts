import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory, 
            dayjsDateProvider, 
            carsRepositoryInMemory
        );
        jest.spyOn(carsRepositoryInMemory, 'updateAvailable').mockResolvedValue(
            Promise.resolve()
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212121",
            expected_return_date: dayAdd24Hours
        });
        expect(rental).toHaveProperty("id"); 
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is already an open rental for that user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212121",
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212121",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create a new rental if there is already an open rental for that car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "teste",
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "teste",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create a new rental with invalid return date.", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "teste",
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    });
});