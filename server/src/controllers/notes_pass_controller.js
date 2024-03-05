import { Note, Password } from "../models/notes_pass.js";
import { User } from "../models/user.js";

export const createPassword = async (req, res) => {
  const { url, category, userName, password, createdBy } = req.body;

  if (!url || !password || !category || !userName || !createdBy) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const passSchema = new Password({
      ...req.body,
    });
    await passSchema.save();
    res.status(200).json({ message: "submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: `Something went wrong` });
  }
};

export const passwordUpdate = async (req, res) => {
  const { _id } = req.params;
  try {
    const updateData = req.body;
    const response = await Password.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(200).json({ message: "updated successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const passwordGet = async (req, res) => {
  let filter = { isActive: true };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  if (req.user._id) {
    filter.createdBy = req.user._id;
  }
  try {
    let result = await Password.find(filter).populate({
      path: "createdBy",
      select: "email",
      model: User,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

// notes controllers

export const createNote = async (req, res) => {
  const { description, details, createdBy } = req.body;

  if (!description || !details || !createdBy) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  try {
    const noteSchema = new Note({
      ...req.body,
    });
    await noteSchema.save();
    res.status(200).json({ message: "submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: `Something went wrong` });
  }
};

export const noteUpdate = async (req, res) => {
  const { _id } = req.params;
  try {
    const updateData = req.body;
    const response = await Note.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(200).json({ message: "updated successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const noteGet = async (req, res) => {
  let filter = { isActive: true };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  if (req.user._id) {
    filter.createdBy = req.user._id;
  }
  try {
    let result = await Note.find(filter).populate({
      path: "createdBy",
      select: "email",
      model: User,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};
