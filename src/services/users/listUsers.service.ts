import { Users } from "../../entities/users.entity";
import AppDataSource from "../../data-source";

const listUsersService = async (): Promise<Users[]> => {
    const userRepository = AppDataSource.getRepository(Users);

    const users = await userRepository.find();

    return users;
};

export default listUsersService;
