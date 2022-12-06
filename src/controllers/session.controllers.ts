import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { IUserSessionRequest } from "../interfaces/users.interfaces";
import createSessionService from "../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Invalid email or password", 403);
    }

    const token = await createSessionService({ email, password });
    return res.json({ token });
};

export { createSessionController };
