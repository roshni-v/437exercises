// src/profiles.ts
import { Document } from "mongoose";
import { Profile } from "./models/profile";
import ProfileModel from "./models/mongo/profile";

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

async function get(userid: String): Promise<Profile> {
  try {
    const list = await ProfileModel.find({ userid });
    console.log(userid);
    console.log(list[0]);
    return list[0];
  } catch (err) {
    throw `${userid} Not Found`;
  }
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

async function createIfNotExists(profile: Profile): Promise<Profile> {
  const userid = profile.userid;
    const list = await ProfileModel.find({ userid });
    if (Object.keys(list).length === 0) {
      const p = new ProfileModel(profile);
      return await p.save();
    } else {
      return list[0];
    }
}

function update(userid: String, profile: Profile): Promise<Profile> {
    return new Promise((resolve, reject) => {
      ProfileModel.findOneAndUpdate({ userid }, profile, {
        new: true,
      }).then((profile) => {
        if (profile) resolve(profile);
        else reject("Failed to update profile");
      });
    });
}

export default { index, get, create, createIfNotExists, update };