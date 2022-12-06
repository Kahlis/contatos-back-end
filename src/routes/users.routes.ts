import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    listUsersController,
} from "../controllers/users.controllers";
import { ensureAdminAuthMiddleware } from "../middlewares/ensureAdminAuth.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", ensureAdminAuthMiddleware, listUsersController);
userRoutes.delete("/:id", ensureAdminAuthMiddleware, deleteUserController);

export default userRoutes;
