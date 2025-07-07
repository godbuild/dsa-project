// ... previous code ...
import authRoutes from "./routes/authRoutes";

// ... after app.use(express.json()) ...
app.use("/api/auth", authRoutes);import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import mentorshipRoutes from "./routes/mentorshipRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Mentorship API running!"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/mentorship", mentorshipRoutes);
app.use("/api/admin", adminRoutes);

mongoose.connect(process.env.MONGO_URI || "", { useNewUrlParser: true, useUnifiedTopology: true } as any)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));