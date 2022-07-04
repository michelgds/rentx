import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();

const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle)

export { carsRoutes }