import { Schema, model, Document } from "mongoose";

export interface IMentorshipRequest extends Document {
  mentee: string;
  mentor: string;
  status: "pending" | "accepted" | "rejected";
  requestedDate: Date;
  session?: string; // Session ID if booked
}

const mentorshipRequestSchema = new Schema<IMentorshipRequest>({
  mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  requestedDate: { type: Date, default: Date.now },
  session: { type: Schema.Types.ObjectId, ref: "Session" },
});

export default model<IMentorshipRequest>("MentorshipRequest", mentorshipRequestSchema);