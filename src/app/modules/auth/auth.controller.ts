import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import status from "http-status";
import { tokenUtils } from "../../utils/token";

const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.register(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  res.status(status.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: { ...result },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.login(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  res.status(status.OK).json({
    success: true,
    message: "User logged in successfully",
    data: { ...result },
  });
});

export const AuthController = { register, login };
