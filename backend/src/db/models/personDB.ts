import mongoose from "mongoose";
import { Person } from "../../interfaces/interfaces";

export const personSchema = new mongoose.Schema<Person>({
  name: String,
  age: Number,
  // TODO: add type to the array
  groups: Array,
});
personSchema.index({ name: 1 });
