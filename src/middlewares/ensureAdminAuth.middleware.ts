import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const ensureAdminAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token = req.headers.authorization;

    if (!token) {
        throw new AppError("Invalid token", 401);
    }

    token = token.split(" ")[1];

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError("Invalid token", 401);
            }

            if (!decoded.isAdm) {
                throw new AppError("Unauthorized operation", 403);
            }

            req.user = {
                isAdm: decoded.isAdm,
                id: decoded.sub,
            };

            next();
        }
    );
};

export { ensureAdminAuthMiddleware };
