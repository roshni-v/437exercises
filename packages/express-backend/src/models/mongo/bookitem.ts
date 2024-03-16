// src/models/mongo/bookitem.ts
import { BookItem } from "../bookitem";
import { Schema, Model, Document, model } from "mongoose";

const bookItemSchema = new Schema<BookItem>(
  {
    bookid: { type: String, required: true, trim: true },
    listid: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true }

  },
  { collection: "book_item" }
);

const BookItemModel = model<BookItem>("BookItem", bookItemSchema);

export default BookItemModel;