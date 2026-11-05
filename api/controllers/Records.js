import Record from "../models/records.js";
import bcrypt from "bcrypt";

export function fetchRecords(req, res) {
  try {
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export function fetchRecord(req, res) {
  try {
    const idToFind = Number(req.params.id);
    const match = records.find((record) => record.id === idToFind);
    if (!match) {
      res.status(404).json({ message: "No record found" });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function createRecord(req, res) {
  try {
    const raw = req.body;
    const hashedPass = await bcrypt.hash(raw.password, 10);
    const data = new Record({ ...raw, password: hashedPass });
    console.log(data);
    await Record.create(data);

    res.status(201).json({ message: "New Record Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export function deleteRecord(req, res) {
  try {
    const idToDelete = Number(req.params.id);
    const match = records.find((record) => record.id === idToDelete);
    if (!match) {
      res.status(404).json({ message: "No record found" });
    }
    const updatedRecords = records.filter((record) => record.id !== idToDelete);
    res.json(updatedRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
