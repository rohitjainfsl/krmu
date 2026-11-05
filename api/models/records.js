import { Schema, model } from "mongoose";

const recordSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true },
);

const Record = model("record", recordSchema);
export default Record;
