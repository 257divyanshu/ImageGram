import dotenv from "dotenv";

// 1️⃣ incorrect configuration (only works if we run this code from /src folder)

// const result = dotenv.config();

// if (result.error) {
//   console.log("Could not find .env file!");
// } else {
//   console.log(".env loaded successfully!");
// }

// 📝 the gotcha
// - dotenv.config() looks for the .env file in the folder where we ran the command (our terminal's current path), not where the serverConfig.js file actually lives.

import path from "path";
import { fileURLToPath } from "url";

// 2️⃣ correct configuration (works no matter from where we run this code)

// 1. Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
// console.log(`__filename ⬇️`);
// console.log(__filename);
const __dirname = path.dirname(__filename);
// console.log(`__dirname ⬇️`);
// console.log(__dirname);

// 2. Point to the .env file explicitly
// Assuming .env is in the src (one level up from config)
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });
// console.log(result);

if (result.error) {
  console.log("Could not find .env file!");
} else {
  console.log(".env loaded successfully!");
}

export const DB_URL = process.env.DB_URL;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;