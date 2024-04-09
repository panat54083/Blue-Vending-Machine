import "dotenv/config";
import { join } from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,

  entities: ["src/entity/**/*.{ts,js}"],
  // entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  migrations: ["src/migrations/**/*.{ts,js}"],
  // migrations: [join(__dirname, "migrations", "**", "*.{ts,js}")],

  subscribers: ["src/subscriber/**/*.{ts,js}"],
});
