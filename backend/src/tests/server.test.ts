import mongoose from "mongoose";
import { routes } from "../utils/routes";
import request from "supertest";
import app from "../server";

jest.mock("../utils/validateENV.ts", () => ({
  PORT: 4001,
  MONGO_CONNECTION_STRING: "mongodb://localhost:27017/test",
}));

jest.mock("../utils/routes", () => ({
  routes: jest.fn(),
}));

jest.mock("mongoose", () => ({
  connect: jest.fn().mockResolvedValue(null), 
}));

describe("Server tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should use json middleware", () => {
    expect(app._router.stack[0].name).toBe("jsonParser");
  });

  it("should use deserializeUser middleware", () => {
    expect(app._router.stack[1].name).toBe("deserializeUser");
  });

  it("should call routes function with app object", () => {
    expect(routes).toHaveBeenCalledWith(app);
  });

  it("should listen on the correct port", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(404);
  });

  it("should log the correct messages", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    await request(app).get("/");
    expect(consoleSpy).toHaveBeenCalledWith("Mongoose Connected");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Server Up and running on port: 3000"
    );
  });

  it("should connect to the correct database", () => {
    expect(mongoose.connect).toHaveBeenCalledWith(
      "mongodb://localhost:27017/test"
    );
  });

  it("should log an error message if it fails to connect to the database", async () => {
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error("Oops"));
    const consoleSpy = jest.spyOn(console, "log");
    await request(app).get("/");
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Oops"));
  });
});
