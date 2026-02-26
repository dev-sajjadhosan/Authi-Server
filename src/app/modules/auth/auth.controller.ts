import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import status from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.register(payload);

  res.status(status.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const AuthController = { register };
