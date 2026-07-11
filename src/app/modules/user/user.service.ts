import { IUser } from "./user.interface";
import { User } from "./user.model";


const registerUser = async (payload: Partial<IUser>) => {
      const { email, password } = payload;
      const data = await User.create({ email, password });

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
      const data = await User.findById(id);

      return data;
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