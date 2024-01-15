import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";
import app from "../app.js";
import { User } from "../models/User.js";

const { PORT, TEST_DB_HOST } = process.env;

describe("test/api/auth/signUp", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("correct data", async () => {
    const registerData = {
      username: "yura",
      email: "yura_test@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/signUp")
      .send(registerData);
    expect(statusCode).toBe(201);
    expect(body.username).toBe(registerData.username);
    expect(body.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
  });
});
