import { jest } from "@jest/globals";

import { registration } from "./index";
import authService from "../../service/auth";
import { HttpCode } from "../../lib/constant";

jest.mock("../../service/auth");

describe("Unit test registration", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "test@test.com", passwird: "123456789" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    next = jest.fn();
    authService.create = jest.fn(async (data) => data);
  });

  test("SignUp new USer", async () => {
    authService.isUserExist = jest.fn(async () => false);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED);
  });

  test("SignUp already exist user", async () => {
    authService.isUserExist = jest.fn(async () => true);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CONFLICT);
  });

  test("SignUp with error database", async () => {
    const testError = new Error("Database error");
    authService.isUserExist = jest.fn(async () => {
      throw testError;
    });
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(next).toHaveBeenCalledWith(testError);
  });
});
