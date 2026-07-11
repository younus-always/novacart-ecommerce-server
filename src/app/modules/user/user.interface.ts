import { UserRole } from "./user.constraint";


export enum IsActive {
      ACTIVE = "ACTIVE",
      INACTIVE = "INACTIVE",
      BLOCKED = "BLOCKED"
};

export interface IAuthProvider {
      provider: "google" | "credentials";
      providerId: string;
};


export interface IUser {
      fullName: string;
      email: string;
      password?: string;
      phone?: string;
      picture?: string;
      address?: string;
      role?: UserRole;
      auths?: [IAuthProvider];
      isActive?: IsActive;
      isDeleted?: boolean;
      isVerified?: boolean;
};