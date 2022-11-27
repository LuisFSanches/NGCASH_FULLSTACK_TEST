import { app } from "../../app";
import request from "supertest";
import { dataSource } from "../../database/ormconfig";

describe("Create User Controller", () => {
  beforeAll(async () => {
    await dataSource.initialize()
    await dataSource.runMigrations();
  });

  afterAll(async () => {
    await dataSource.undoLastMigration()
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("should create an User", async () => {
    const response = await request(app).post("/api/user/create").send({
      username: 'John',
      password: 'Test1234'
    });
    expect(response.status).toBe(201)
  });

  it("should not create an User with wrong password pattern", async () => {
    const response = await request(app).post("/api/user/create").send({
      username: 'John',
      password: 'Test123'
    });
    expect(response.status).toBe(400)
  });

  it("should not create an User with an username with less than three letters", async() => {
    const response = await request(app).post("/api/user/create").send({
      username: 'Jo',
      password: 'Test1234'
    });
    expect(response.status).toBe(400)
  })
})