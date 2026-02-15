const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/greenscan")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// USER SCHEMA
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  paperBalance: { type: Number, default: 2450 } 
});

const User = mongoose.model("User", userSchema);

// In-memory logs (This is what generates your table)
let printLogs = [];

/* =======================
   ROUTES
======================= */

// 1. REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User exists" });

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 2. LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ 
      message: "Login successful", 
      email: user.email, 
      paperBalance: user.paperBalance 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 3. PRINT ACTION (Updates DB + Adds to Table Logs)
app.post("/api/print", async (req, res) => {
  try {
    const { email, documentName, pages } = req.body;
    console.log(`Print request: ${documentName} for ${email}`);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update MongoDB
    user.paperBalance -= Number(pages);
    await user.save();

    // Create a new log for the table
    const newLog = { 
        id: Date.now(), 
        documentName, 
        pages: Number(pages) 
    };
    printLogs.push(newLog);

    // IMPORTANT: Return both new balance AND the updated logs list
    res.json({ 
        newBalance: user.paperBalance, 
        logs: printLogs 
    });
  } catch (error) {
    console.error("Print Error:", error);
    res.status(500).json({ message: "Print failed" });
  }
});

// 4. GET LOGS (Used for the table)
app.get("/api/print", (req, res) => {
  res.json(printLogs);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));