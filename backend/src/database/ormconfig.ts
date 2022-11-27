import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Test1234",
  database: process.env.NODE_ENV === "test" ? "ng_cash_test" : "ng_cash",
  migrations: ['src/database/migrations/**/*.ts'],
  entities: ["./src/**/entities/*.ts"],
});

dataSource.initialize();