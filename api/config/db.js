import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
  await mongoose.connect(process.env.MONGO_URL);
}
export default connectToDB;
