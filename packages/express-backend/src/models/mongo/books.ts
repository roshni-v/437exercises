// src/models/mongo/books.ts
import { Books } from "../books";
import { Schema, Model, Document, model } from "mongoose";

const booksSchema = new Schema<Books>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
        
  },
  { collection: "books" }
);

const BooksModel = model<Books>("Books", booksSchema);

export default BooksModel;