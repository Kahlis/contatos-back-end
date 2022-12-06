import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interfaces";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

const createUserService = async ({
    email,
    name,
    password,
}: IUserRequest): Promise<IUserRequest> => {
    const userRepository = AppDataSource.getRepository(Users);
    const exists = await userRepository.findOneBy({
        email,
    });

    if (!password) {
        throw new AppError("Password is a required field");
    }

    if (exists) {
        throw new AppError("Bad request", 400);
    }
    const hashedPassword = await hash(password, 10);

    const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        isActive: true,
    });

    await userRepository.save(user);
    const returnUser: IUserResponse = { ...user };
    delete returnUser.password;

    return returnUser;
};

export default createUserService;
