import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const config = (): ConnectionOptions => ({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
  logging: true,
});
