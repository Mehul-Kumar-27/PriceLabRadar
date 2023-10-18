import mongoose from "mongoose";
import { UserDocument } from "./user.mongoose";

export interface SessionInterface extends Document {
  user: UserDocument["_id"];
  valid: Boolean;
  userAgent: String;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;
