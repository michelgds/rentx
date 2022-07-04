import { Router } from 'express';

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureIsAdmin';


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes }