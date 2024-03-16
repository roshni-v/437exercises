// src/bookitem.ts
import { Document } from "mongoose";
import BookItemModel from "./models/mongo/bookitem";
import { BookItem } from "./models/bookitem";

function index(): Promise<BookItem[]> {
  return BookItemModel.find();
}

async function get(listid: String): Promise<BookItem[]> {
  try {
    const list = await BookItemModel.find({ listid:listid });
    console.log(list);
    return list;
  } catch (err) {
    throw `${listid} Not Found`;
  }
}

async function getByBookItemId(bookid: String): Promise<BookItem> {
  try {
    const list = await BookItemModel.find({ bookid:bookid });
    console.log(list[0]);
    return list[0];
  } catch (err) {
    throw `${bookid} Not Found`;
  }
}

function create(bookItem: BookItem): Promise<BookItem> {
  const u = new BookItemModel(bookItem);
  return u.save();
}

function update(bookid: String, bookItem: BookItem): Promise<BookItem> {
    return new Promise((resolve, reject) => {
      BookItemModel.findOneAndUpdate({ bookid }, bookItem, {
        new: true,
      }).then((bookItem) => {
        if (bookItem) resolve(bookItem);
        else reject("Failed to update bookItem");
      });
    });
}

async function removeFromList(listid: String) {
  try{
    await BookItemModel.deleteMany({listid:listid });
  } catch (err) {
    throw `${listid} Not Found`;
  }
}

export default { index, get, getByBookItemId, create, update, removeFromList };