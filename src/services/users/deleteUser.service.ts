import { Users } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { ISimpleResponse } from "../../interfaces/users.interfaces";

const deleteUserService = async (id: string): Promise<ISimpleResponse> => {
    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({
        where: {
            id,
        },
    });

    if (user) {
        if (user.isActive) {
            user.isActive = false;
        } else {
            throw new AppError("Bad request", 400);
        }
    } else {
        throw new AppError("User not found", 404);
    }

    await userRepository.save(user);

    const response = { message: "User delete success" };
    return response;
};

export default deleteUserService;
