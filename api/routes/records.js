import { Router } from "express";
import {
  createRecord,
  deleteRecord,
  fetchRecord,
  fetchRecords,
} from "../controllers/Records.js";
const recordRouter = Router();

recordRouter.get("/", fetchRecords);
recordRouter.get(":id", fetchRecord);
recordRouter.post("/create", createRecord);
recordRouter.delete(":id", deleteRecord);

export default recordRouter;
