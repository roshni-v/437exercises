// src/sessions.ts
import { Document } from "mongoose";
import { Session } from "./models/session";
import SessionModel from "./models/mongo/session";

function index(): Promise<Session[]> {
  return SessionModel.find();
}

async function get(): Promise<Session> {
    try {
      const list = await SessionModel.find({});
      console.log(list[0]);
      return list[0];
    } catch (err) {
      throw `No Active Session Found`;
    }
  }

function create(session: Session): Promise<Session> {
  const s = new SessionModel(session);
  return s.save();
}


async function clear(id: String){

    console.log("id" + id);
    try {
        const result = await SessionModel.deleteMany( { sessionid : { $ne : id } } );
    } catch (err) {
        console.error(err);
    }

}

export default { index, get, create, clear };