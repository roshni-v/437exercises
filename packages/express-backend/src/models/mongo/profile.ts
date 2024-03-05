// src/models/mongo/profile.ts
import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../Profile";

const profileSchema = new Schema<Profile>(
  {
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    darkmode: { type: Boolean, required: true },
  },
  { collection: "user_profiles" }
);

const ProfileModel = model<Profile>("Profile", profileSchema);

export default ProfileModel;