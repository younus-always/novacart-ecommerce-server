import { AppError } from "../../Error/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from "bcryptjs";
import { createNewAccessTokenByRefreshToken, createUserTokens } from "../../utils/userTokens";


const loginUser = async (email: string, password: string) => {
      const isUserExist = await User.findOne({ email });
      if (!isUserExist) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
      };

      const checkPassword = await bcrypt.compare(password, isUserExist.password as string);
      if (!checkPassword) {
            throw new AppError(httpStatus.NOT_FOUND, "Invalid email or password!")
      };

      const userTokens = createUserTokens(isUserExist);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...user } = isUserExist.toObject();

      return {
            userTokens,
            user
      };
};

const getNewAccessToken = async (refreshToken: string) => {
      if (!refreshToken) {
            throw new AppError(httpStatus.NOT_FOUND, "user refresh-token missing from cookies!")
      };
      const newAccessToken = await createNewAccessTokenByRefreshToken(refreshToken);

      return {
            accessToken: newAccessToken
      };
};


export const authService = {
      loginUser,
      getNewAccessToken
};