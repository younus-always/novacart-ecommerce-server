/* eslint-disable no-console */
import { envVars } from "../config/env";
import { UserRole } from "../modules/user/user.constraint";
import { IAuthProvider, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
      try {
            const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });

            if (isSuperAdminExist) {
                  console.log("Super Admin Already Exist!");
                  return;
            };
            console.log("Trying to create super admin....");

            const hashPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, envVars.BCRYPT_SALT);

            const authProvider: IAuthProvider = {
                  provider: "credentials",
                  providerId: envVars.SUPER_ADMIN_EMAIL,
            };

            const payload: Partial<IUser> = {
                  fullName: "Super Admin",
                  email: envVars.SUPER_ADMIN_EMAIL,
                  password: hashPassword,
                  role: UserRole.SUPER_ADMIN,
                  isVerified: true,
                  auths: [authProvider]
            };

            const superAdmin = await User.create(payload);

            console.log("Super Admin created successfully", superAdmin);
      } catch (error) {
            console.log(error);
      }
};