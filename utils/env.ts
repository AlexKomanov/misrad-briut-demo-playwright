import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable "${name}". Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const env = {
  baseUrl: requireEnv('BASE_URL'),
  standardUser: requireEnv('STANDARD_USER'),
  lockedOutUser: requireEnv('LOCKED_OUT_USER'),
  password: requireEnv('PASSWORD'),
};
