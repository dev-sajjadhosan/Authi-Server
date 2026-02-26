import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";
import { IRegisterPatientPayload } from "./auth.interface";

const register = async (payload: IRegisterPatientPayload) => {
  const { email, name, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    throw new Error("Failed to register profile");
    // throw new AppError(status.BAD_REQUEST, "Failed to register patient");

    // accessToekn not set just RefreshToken set.
  }

  try {
    const profile = await prisma.$transaction(async (tx) => {
      const profileTx = await tx.profile.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });

      return profileTx;
    });

    const accessToken = tokenUtils.getAccessToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    return {
      ...data,
      accessToken,
      refreshToken,
      profile,
    };
  } catch (error) {
    console.log("Transaction error : ", error);
    
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw error;
  }
};

export const AuthService = {
  register,
};
