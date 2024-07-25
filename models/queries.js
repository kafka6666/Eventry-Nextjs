import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data.util";
import mongoose from "mongoose";
import { eventModel } from "./events.model";
import { userModel } from "./users.model";

async function getAllEvents() {
  const allEvents = await eventModel.find().lean();
  return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
  const event = await eventModel.findById(eventId).lean();
  const eventInfo = replaceMongoIdInObject(event);
  return JSON.parse(JSON.stringify(eventInfo));
}

async function createUser(userFormData) {
  const newUser = await userModel.create(userFormData);
  return newUser;
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateInterest(eventId, userId) {
  const foundEvent = await eventModel.findById(eventId);

  if (foundEvent) {
    const foundUser = foundEvent.interested_ids.find(
      (id) => id.toString() === userId
    );

    if (foundUser) {
      foundEvent.interested_ids.pull(new mongoose.Types.ObjectId(userId));
    } else {
      foundEvent.interested_ids.push(new mongoose.Types.ObjectId(userId));
    }
  }

  await foundEvent.save();
}

async function updateGoing(eventId, userId) {
  const foundEvent = await eventModel.findById(eventId);

  foundEvent?.going_ids?.push(new mongoose.Types.ObjectId(userId));

  await foundEvent?.save();
}

export {
  createUser,
  findUserByCredentials,
  getAllEvents,
  getEventById,
  updateGoing,
  updateInterest,
};
