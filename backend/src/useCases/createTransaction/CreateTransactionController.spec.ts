import { app } from "../../app";
import request from "supertest";
import { dataSource } from "../../database/ormconfig";

describe("Create Transaction Controller", () => {
  beforeEach(async () => {
    await dataSource.initialize()
    await dataSource.runMigrations();
  });

  afterEach(async () => {
    await dataSource.undoLastMigration()
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("should be able to create a transaction", async () => {

    await request(app).post("/api/user/create").send({
      username: 'John',
      password: 'Test1234'
    });

    const mary = await request(app).post("/api/user/create").send({
      username: 'Mary',
      password: 'Test1234'
    });

    const { body: { token } } = await request(app).post("/api/login").send({
      username: 'John',
      password: 'Test1234'
    });

    const response = await request(app).post("/api/transaction/create").send({
      creditedAccountId: mary.body.accountId,
      value: 5
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(201)
  });

  it("should not be able to create a transaction with a value higher than balance", async () => {

    await request(app).post("/api/user/create").send({
      username: 'John',
      password: 'Test1234'
    });

    const mary = await request(app).post("/api/user/create").send({
      username: 'Mary',
      password: 'Test1234'
    });

    const { body: { token } } = await request(app).post("/api/login").send({
      username: 'John',
      password: 'Test1234'
    });

    const response = await request(app).post("/api/transaction/create").send({
      creditedAccountId: mary.body.accountId,
      value: 500
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(400)
  });

  it("should not be able to create a transaction to itself", async () => {

    const john = await request(app).post("/api/user/create").send({
      username: 'John',
      password: 'Test1234'
    });

    const { body: { token } } = await request(app).post("/api/login").send({
      username: 'John',
      password: 'Test1234'
    });

    const response = await request(app).post("/api/transaction/create").send({
      creditedAccountId: john.body.accountId,
      value: 5
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(400)
  });
})