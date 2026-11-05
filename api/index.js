import express from "express";
import recordRouter from "./routes/records.js";
import authRouter from "./routes/auth.js";
import connectToDB from "./config/db.js";
import "dotenv/config";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

await connectToDB();

//API

app.use("/api/records", recordRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log("Server has started on port " + PORT));
