import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { env } from "../config/env";
import { Response } from "express";
import { CookieUtils } from "./cookie";

const getAccessToken = (payload: JwtPayload) => {
  const token = jwtUtils.createToken(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const getRefreshToken = (paylaod: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(paylaod, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return refreshToken;
};

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 1000,
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30 * 1000,
  });
};

const setBetterAuthSessionCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 1000,
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
};
