import mongoose from "mongoose";
const passwordSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    category: {
      type: String,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    details: {
      type: String,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    isActive: {
      type: Boolean,
      default:true
    }
  },
  { timestamps: true }
);
const noteSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    details: {
      type: String,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    isActive: {
      type: Boolean,
      default:true
    }
  },
  { timestamps: true }
);
export const Note = mongoose.model("note", noteSchema);
export const Password = mongoose.model("password", passwordSchema);
