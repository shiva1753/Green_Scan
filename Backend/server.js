const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/greenscan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* =======================
   USER SCHEMA & MODEL
======================= */
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

/* =======================
   ROUTES
======================= */

/**
 * REGISTER USER
 */
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * LOGIN USER
 */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   SERVER START
======================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
