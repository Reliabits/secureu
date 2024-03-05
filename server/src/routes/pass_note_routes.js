import express from "express";
const routes = express.Router();


import { protect } from "../middleware/user_middleware.js";
import { createNote, createPassword, noteGet, noteUpdate, passwordGet, passwordUpdate } from "../controllers/notes_pass_controller.js";

routes.post("/password", protect, createPassword);
routes.put("/password/:_id",protect, passwordUpdate);
routes.get("/password", protect, passwordGet);

// notes routes 

routes.post("/note", protect, createNote);
routes.put("/note/:_id",protect, noteUpdate);
routes.get("/note",protect, noteGet);


export default routes;
