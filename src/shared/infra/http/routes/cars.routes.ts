import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

export { carsRoutes }