import { app } from "../../app";
import request from "supertest";
import { dataSource } from "../../database/ormconfig";

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    await dataSource.initialize()
    await dataSource.runMigrations();
  });

  afterAll(async () => {
    await dataSource.undoLastMigration()
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("should be able to authenticate User", async () => {

    await request(app).post("/api/user/create").send({
      username: 'John',
      password: 'Test1234'
    });

    const response = await request(app).post("/api/login").send({
      username: 'John',
      password: 'Test1234'
    });

    expect(response.body).toHaveProperty("token")
  });
})