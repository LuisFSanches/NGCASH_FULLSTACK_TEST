import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { transactionRoutes } from "./transaction.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/api/user", userRoutes);
routes.use("/api/login", authenticateRoutes);
routes.use("/api/transaction", transactionRoutes)

export { routes };