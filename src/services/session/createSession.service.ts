import AppDataSource from "../../data-source";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { IUserSessionRequest } from "../../interfaces/users.interfaces";
import { Users } from "../../entities/users.entity";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({
    email,
    password,
}: IUserSessionRequest): Promise<string> => {
    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({
        where: {
            email: email,
        },
    });

    if (!user) {
        throw new AppError("Invalid email or password", 403);
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
        throw new AppError("Invalid email or password", 403);
    }

    const token = jwt.sign(
        {
            email: user.email,
        },
        process.env.SECRET_KEY as string,
        {
            subject: user.id,
            expiresIn: "1d",
        }
    );

    return token;
};

export default createSessionService;
