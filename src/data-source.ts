import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: ["src/entities/*.ts"],
});

export default AppDataSource;
