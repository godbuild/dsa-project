import { Schema, model, Document } from "mongoose";

export interface IAuditLog extends Document {
  adminId: string;
  action: string;
  details?: string;
  timestamp: Date;
}

const auditLogSchema = new Schema<IAuditLog>({
  adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  details: String,
  timestamp: { type: Date, default: Date.now },
});

export default model<IAuditLog>("AuditLog", auditLogSchema);