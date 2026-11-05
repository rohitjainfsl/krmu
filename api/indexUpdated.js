import express from "express";

const app = express();
const PORT = 4001;

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

const records = [
  { id: 1, name: "Vasu", phone: "1234567890" },
  { id: 2, name: "Ankit", phone: "1234567892" },
  { id: 3, name: "Anshika", phone: "1234567893" },
  { id: 4, name: "Bhavya", phone: "1234567894" },
];

const allowedFields = new Set(["name", "phone"]);

function validateRecord(body, { partial = false } = {}) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be a JSON object" };
  }

  const fields = Object.keys(body);
  if (fields.some((field) => !allowedFields.has(field))) {
    return { error: "Only name and phone fields are allowed" };
  }
  if (partial && fields.length === 0) {
    return { error: "Provide at least one field to update" };
  }
  if (!partial && (!fields.includes("name") || !fields.includes("phone"))) {
    return { error: "Both name and phone are required" };
  }

  const value = {};
  if (fields.includes("name")) {
    if (typeof body.name !== "string") {
      return { error: "Name must be text" };
    }

    value.name = body.name.trim();
    if (value.name.length < 1 || value.name.length > 50) {
      return { error: "Name must be between 1 and 50 characters" };
    }
  }

  if (fields.includes("phone")) {
    if (typeof body.phone !== "string" || !/^\d{10}$/.test(body.phone)) {
      return { error: "Phone must be a 10-digit string" };
    }
    value.phone = body.phone;
  }

  return { value };
}

function parseRecordId(rawId) {
  if (!/^[1-9]\d*$/.test(rawId)) {
    return null;
  }

  const id = Number(rawId);
  return Number.isSafeInteger(id) ? id : null;
}

app.get("/api/records", (req, res) => {
  res.json(records);
});

app.get("/api/records/:id", (req, res) => {
  const id = parseRecordId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "ID must be a positive whole number" });
  }

  const match = records.find((record) => record.id === id);
  if (!match) {
    return res.status(404).json({ message: "No record found" });
  }

  res.json(match);
});

app.post("/api/records", (req, res) => {
  const result = validateRecord(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  const nextId = records.reduce((maxId, record) => Math.max(maxId, record.id), 0) + 1;
  const newRecord = { id: nextId, ...result.value };
  records.push(newRecord);
  res.status(201).json(newRecord);
});

app.put("/api/records/:id", (req, res) => {
  const id = parseRecordId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "ID must be a positive whole number" });
  }

  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "No record found" });
  }

  const result = validateRecord(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  records[index] = { id, ...result.value };
  res.json(records[index]);
});

app.patch("/api/records/:id", (req, res) => {
  const id = parseRecordId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "ID must be a positive whole number" });
  }

  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "No record found" });
  }

  const result = validateRecord(req.body, { partial: true });
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  records[index] = { ...records[index], ...result.value };
  res.json(records[index]);
});

app.delete("/api/records/:id", (req, res) => {
  const id = parseRecordId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: "ID must be a positive whole number" });
  }

  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "No record found" });
  }

  records.splice(index, 1);
  res.status(204).end();
});

app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body must contain valid JSON" });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body is too large" });
  }

  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
