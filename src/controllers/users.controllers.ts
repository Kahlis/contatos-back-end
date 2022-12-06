import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";

const createUserController = async (req: Request, res: Response) => {
    const { email, name, password }: IUserRequest = req.body;
    const user = await createUserService({ email, name, password });
    return res.status(201).json(user);
};

const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService();
    return res.json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await deleteUserService(id);
    return res.status(204).json(response);
};

export { createUserController, listUsersController, deleteUserController };
