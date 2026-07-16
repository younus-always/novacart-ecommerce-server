import { envVars } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";


const registerUser = async (payload: Partial<IUser>) => {
      const { email, password } = payload;
      const isUserExist = await User.findOne({ email });

      if (isUserExist) {
            throw new Error("User already exists!");
      };

      const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: email as string,
      };

      const hashPassword = await bcrypt.hash(password as string, envVars.BCRYPT_SALT);

      const data = await User.create({
            ...payload,
            email,
            password: hashPassword,
            auths: [authProvider],
      });

      return data;
};

const getAllUser = async () => {
      const data = await User.find({});
      const total = await User.countDocuments();

      return {
            data,
            meta: { total }
      };
};

const getUserById = async (id: string) => {
      const user = await User.findById(id);

      if (!user) {
            throw new Error("User not found!");
      };

      return user;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
      const isUserExist = await User.findById(id);

      if (!isUserExist) {
            throw new Error("User Not Found!")
      };

      const user = await User.findByIdAndUpdate(id, payload, { returnDocument: "after" });
      return user;
};

const deleteUser = async (id: string) => {
      const isUserExist = await User.findById(id);

      if (!isUserExist) {
            throw new Error("User Not Found");
      };

      const user = await User.findByIdAndDelete(id);
      return user;
};

export const userService = {
      registerUser,
      getAllUser,
      getUserById,
      updateUser,
      deleteUser,
};