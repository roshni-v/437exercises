// src/models/mongo/session.ts
import { Schema, Model, Document, model } from "mongoose";
import { Session } from "../session";

const sessionSchema = new Schema<Session>(
  {
    sessionid: { type: String, required: true, trim: true },
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    darkmode: { type: Boolean, required: true },
  },
  { collection: "sessions" }
);

const SessionModel = model<Session>("Session", sessionSchema);

export default SessionModel;