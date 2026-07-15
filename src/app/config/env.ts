import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
      PORT: string;
      DB_URL: string;
      NODE_ENV: "development" | "production";
      BCRYPT_SALT: number;
      SUPER_ADMIN_EMAIL: string;
      SUPER_ADMIN_PASSWORD: string;
};

const loadEnvVariables = (): EnvConfig => {
      const requiredEnv: string[] = ["PORT", "NODE_ENV", "DB_URL", "BCRYPT_SALT", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD"];

      requiredEnv.forEach(key => {
            if (!process.env[key]) {
                  throw new Error(`Missing required env variable: ${key}`);
            }
      });

      return {
            PORT: process.env.PORT as string,
            DB_URL: process.env.DB_URL as string,
            NODE_ENV: process.env.NODE_ENV as "development" | "production",
            BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
            SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
            SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
      };
};

export const envVars = loadEnvVariables();