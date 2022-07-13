import { AppError } from "@errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212121",
            expected_return_date: new Date()
        });
        expect(rental).toHaveProperty("id"); 
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is already an open rental for that user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212121",
                expected_return_date: new Date()
            });
    
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212121",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create a new rental if there is already an open rental for that car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "teste",
                expected_return_date: new Date()
            });
    
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "teste",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });
});