import { AppError } from "../../Error/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from "bcryptjs";


const loginUser = async (email: string, password: string) => {
      const isUserExist = await User.findOne({ email });
      if (!isUserExist) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
      };

      const checkPassword = await bcrypt.compare(password, isUserExist.password as string);
      if (!checkPassword) {
            throw new AppError(httpStatus.NOT_FOUND, "Invalid email or password!")
      };


      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...user } = isUserExist.toObject();

      return {
            user
      };
};


export const authService = {
      loginUser,
};