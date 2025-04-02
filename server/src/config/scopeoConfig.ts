import { configManager } from "scopeo";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.PASS_KEY, "from scopeoConfig.ts");
export const setupScopeoConfig = () => {
  try {
    configManager.setConfig({
      apiKey: process.env.API_KEY,
      passKey: process.env.PASS_KEY,
      environment: process.env.ENVIRONMENT, // 'development' or 'production'
    });
  } catch (error) {
    console.log(error, "from scopeo package");
  }
};
