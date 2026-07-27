import { envVars } from "../config/env";
import { AppError } from "../Error/AppError";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from 'http-status-codes';


export const createUserTokens = (user: Partial<IUser>) => {
      const jwtPayload = {
            userId: user._id,
            email: user.email,
            role: user.role
      };

      const accessToken = generateToken(jwtPayload, envVars.JWT.ACCESS_SECRET_TOKEN, envVars.JWT.ACCESS_TOKEN_EXPIRES);
      const refreshToken = generateToken(jwtPayload, envVars.JWT.REFRESH_SECRET_TOKEN, envVars.JWT.REFRESH_TOKEN_EXPIRES);

      return {
            accessToken,
            refreshToken
      };
};


export const createNewAccessTokenByRefreshToken = async (refreshToken: string) => {
      const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT.REFRESH_SECRET_TOKEN);

      const user = await User.findOne({ email: verifiedRefreshToken.email });

      if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
      };

      if (user.isActive === IsActive.INACTIVE || user.isActive === IsActive.BLOCKED) {
            throw new AppError(httpStatus.FORBIDDEN, `User account is ${user.isActive}`);
      };

      if (user.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, "User account is deleted!")
      };

      const jwtPayload = {
            userId: user._id,
            email: user.email,
            role: user.role
      };

      const accessToken = generateToken(jwtPayload, envVars.JWT.ACCESS_SECRET_TOKEN, envVars.JWT.ACCESS_TOKEN_EXPIRES);

      return accessToken;
};