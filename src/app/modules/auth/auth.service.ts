import { AppError } from "../../Error/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import { IsActive } from "../user/user.interface";
import { generateToken, verifyToken } from "../../utils/jwt";


const loginUser = async (email: string, password: string) => {
      const isUserExist = await User.findOne({ email });
      if (!isUserExist) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
      };

      const checkPassword = await bcrypt.compare(password, isUserExist.password as string);
      if (!checkPassword) {
            throw new AppError(httpStatus.NOT_FOUND, "Invalid email or password!")
      };

      const payload = {
            userId: isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role
      };

      const accessToken = generateToken(payload, envVars.JWT.ACCESS_SECRET_TOKEN, envVars.JWT.ACCESS_TOKEN_EXPIRES);
      const refreshToken = generateToken(payload, envVars.JWT.REFRESH_SECRET_TOKEN, envVars.JWT.REFRESH_TOKEN_EXPIRES);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...user } = isUserExist.toObject();

      return {
            accessToken,
            refreshToken,
            user
      };
};

const getNewAccessToken = async (refreshToken: string) => {
      if (!refreshToken) {
            throw new AppError(httpStatus.NOT_FOUND, "user refresh-token missing from cookies!")
      };

      const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT.REFRESH_SECRET_TOKEN);

      const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

      if (!isUserExist) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
      };

      if (isUserExist.isActive === IsActive.INACTIVE || isUserExist.isActive === IsActive.BLOCKED) {
            throw new AppError(httpStatus.FORBIDDEN, `User account is ${isUserExist.isActive}`);
      };

      if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, "User account is deleted!")
      };

      const jwtPayload = {
            userId: isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role
      };

      const accessToken = generateToken(jwtPayload, envVars.JWT.ACCESS_SECRET_TOKEN, envVars.JWT.ACCESS_TOKEN_EXPIRES);

      return {
            accessToken
      };
};


export const authService = {
      loginUser,
      getNewAccessToken
};