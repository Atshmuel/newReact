import mongoose from "mongoose";

export const groupSchema = new mongoose.Schema({
  groupName: String,
  persons: Array,
  groups: [String],
  fathers: Array,
  hasAFather: Boolean,
});
