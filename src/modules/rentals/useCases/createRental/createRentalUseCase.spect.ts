import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;

describe("Create rental", () => {
    beforeEach(() => {
        createRentalUseCase = new CreateRentalUseCase();
    });

    it("should be able to create a new rental", () => {
        createRentalUseCase.execute();
    })
});