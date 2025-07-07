import { Schema, model, Document } from "mongoose";

export interface ISession extends Document {
  mentor: string;
  mentee: string;
  scheduledFor: Date;
  status: "scheduled" | "completed" | "cancelled";
  feedback?: string;
  rating?: number;
}

const sessionSchema = new Schema<ISession>({
  mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  scheduledFor: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  feedback: String,
  rating: Number,
});

export default model<ISession>("Session", sessionSchema);