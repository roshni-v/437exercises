// src/userlist.ts
import { Document } from "mongoose";
import UserListsModel from "./models/mongo/userlist";
import { UserList } from "./models/userlist";

function index(): Promise<UserList[]> {
  return UserListsModel.find();
}

async function get(userid: String): Promise<UserList[]> {
  try {
    const list = await UserListsModel.find({ userid:userid });
    console.log(list);
    return list;
  } catch (err) {
    throw `${userid} Not Found`;
  }
}

async function getByListId(listid: String): Promise<UserList> {
  try {
    const list = await UserListsModel.find({ listid:listid });
    console.log(list[0]);
    return list[0];
  } catch (err) {
    throw `${listid} Not Found`;
  }
}

function create(userlist: UserList): Promise<UserList> {
  const u = new UserListsModel(userlist);
  return u.save();
}

async function remove(listid: String) {
  try{
    await UserListsModel.deleteOne({listid:listid });
  } catch (err) {
    throw `${listid} Not Found`;
  }
}


function update(userid: String, userlist: UserList): Promise<UserList> {
    return new Promise((resolve, reject) => {
      UserListsModel.findOneAndUpdate({ userid }, userlist, {
        new: true,
      }).then((userlist) => {
        if (userlist) resolve(userlist);
        else reject("Failed to update userlist");
      });
    });
}

export default { index, get, getByListId, create, update, remove };