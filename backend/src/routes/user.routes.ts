import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { GetUserDataController } from "../useCases/getUserData/GetUserDataController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ListAvailableUsersController } from "../useCases/listAvailableUsers/ListAvailableUsersController";

const userRoutes = Router();

const createUserControler = new CreateUserController();
const getUserDataControler = new GetUserDataController();
const listAvailableUsersController = new ListAvailableUsersController();

userRoutes.post("/create", createUserControler.handle);
userRoutes.get("/list", ensureAuthentication, listAvailableUsersController.handle);
userRoutes.get("/", ensureAuthentication ,getUserDataControler.handle);


export { userRoutes };