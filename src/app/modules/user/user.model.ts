import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser } from "./user.interface";
import { UserRole } from "./user.constraint";

const authProviderSchema = new Schema<IAuthProvider>({
      provider: { type: String },
      providerId: { type: String, trim: true, unique: true, lowercase: true }
}, { _id: false });

const userSchema = new Schema<IUser>({
      fullName: {
            type: String,
            trim: true,
            required: true,
      },
      email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
      },
      password: {
            type: String,
            min: [8, "Password must contain at least 8 characters"],
            max: [20, "Password cannot exceed 20 characters"]
      },
      picture: { type: String },
      phone: { type: String },
      address: { type: String },
      role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER
      },
      auths: [authProviderSchema],
      isActive: {
            type: String,
            enum: Object.values(IsActive),
            default: IsActive.ACTIVE
      },
      isVerified: {
            type: Boolean,
            default: false
      },
      isDeleted: {
            type: Boolean,
            default: false
      }

}, {
      versionKey: false,
      timestamps: true,
});

export const User = model<IUser>("User", userSchema);