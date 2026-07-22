import { AppError } from "../../Error/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { envVars } from "../../config/env";


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
            email: isUserExist.email,
            role: isUserExist.role
      };

      const accessToken = jwt.sign(payload, envVars.JWT.ACCESS_SECRET_TOKEN, { expiresIn: envVars.JWT.ACCESS_TOKEN_EXPIRES } as SignOptions);
      const refreshToken = jwt.sign(payload, envVars.JWT.REFRESH_SECRET_TOKEN, { expiresIn: envVars.JWT.REFRESH_TOKEN_EXPIRES } as SignOptions);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...user } = isUserExist.toObject();

      return {
            accessToken,
            refreshToken,
            user
      };
};


export const authService = {
      loginUser,
};