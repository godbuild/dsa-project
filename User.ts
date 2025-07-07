import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "mentor" | "mentee";
  bio?: string;
  skills?: string[];
  goals?: string;
  availability?: string[]; // mentor
  rating?: number;
  verified: { type: Boolean, default: false },
  verificationToken: String,
  resetToken: String,
  resetTokenExpiry: Date,
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "mentor", "mentee"], default: "mentee" },
  bio: String,
  skills: [String],
  goals: String,
  availability: [String],
  rating: Number,
});

export default model<IUser>("User", userSchema);