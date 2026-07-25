import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import { UserRole } from "../modules/user/user.constraint";

export interface IJwtPayload {
      userId: Types.ObjectId;
      email: string;
      role: UserRole | undefined;
};

export const generateToken = (payload: IJwtPayload, secret: string, expiresIn: string) => {
      const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
      return token;
};

export const verifyToken = (token: string, secret: string) => {
      const verifiedToken = jwt.verify(token, secret) as JwtPayload;
      return verifiedToken;
};