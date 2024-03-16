// src/models/mongo/userlists.ts
import { UserList } from "../userlist";
import { Schema, Model, Document, model } from "mongoose";

const userListSchema = new Schema<UserList>(
  {
    listid: { type: String, required: true, trim: true },
    userid: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
  },
  { collection: "user_lists" }
);

const UserListModel = model<UserList>("UserList", userListSchema);

export default UserListModel;