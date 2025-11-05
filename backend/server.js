import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let entries = []; 


app.post("/api/entries", (req, res) => {
  const entry = req.body;


  if (!entry.category || !entry.amount || !entry.date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  entry.status = "Pending";
  entry.id = Date.now();
  entries.push(entry);

  res.json({ message: "Entry added successfully", entry });
});


app.get("/api/entries", (req, res) => {
  res.json(entries);
});


app.put("/api/entries/:id/approve", (req, res) => {
  const id = Number(req.params.id);
  const entry = entries.find((e) => e.id === id);
  if (!entry) return res.status(404).json({ error: "Entry not found" });

  entry.status = "Approved";
  res.json({ message: "Entry approved", entry });
});


app.put("/api/entries/:id/reject", (req, res) => {
  const id = Number(req.params.id);
  const entry = entries.find((e) => e.id === id);
  if (!entry) return res.status(404).json({ error: "Entry not found" });

  entry.status = "Rejected";
  entry.rejectionReason = req.body.reason || "No reason provided";
  res.json({ message: "Entry rejected", entry });
});

app.get("/api/stats", (req, res) => {
  const total = entries.length;
  const approved = entries.filter((e) => e.status === "Approved").length;
  const pending = entries.filter((e) => e.status === "Pending").length;
  const rejected = entries.filter((e) => e.status === "Rejected").length;
  res.json({ total, approved, pending, rejected });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
