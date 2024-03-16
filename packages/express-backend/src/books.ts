// src/bookitem.ts
import { Document } from "mongoose";
import BooksModel from "./models/mongo/books";
import { Books } from "./models/books";

function index(): Promise<Books[]> {
  return BooksModel.find();
}

async function getByBookTitle(title: String): Promise<Books> {
  try {
    const list = await BooksModel.find({ title:title }).select({ "title": 1, "author": 1, "plaintext_content": 0});;
    console.log(list[0]);
    return list[0];
  } catch (err) {
    throw `${title} Not Found`;
  }
}


export default { index, getByBookTitle};