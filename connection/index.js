// getting-started.js
import mongoose from "mongoose";
import { env } from "../config/index.js";

main().catch((err) => console.log(err));

async function main() {
  if (env.STAGE === "dev") {
    await mongoose.connect(
      `${env.MONGODB_URL}${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DB_NAME}`
    );
  } else if (env.STAGE === "prod") {
    await mongoose.connect(
      `${env.MONGODB_URL}${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DB_NAME}`
    );
  }

  console.info("Success Connect to Mongodb");
}
