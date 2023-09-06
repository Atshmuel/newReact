import { groupSchema } from "./groupDB";
import { personSchema } from "./personDB";
import mongoose from "mongoose";

export const PersonModel = mongoose.model("person", personSchema);
export const GroupModel = mongoose.model("groups", groupSchema);
