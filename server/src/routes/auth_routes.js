import express from "express";
const routes = express.Router();

import {
  userSignup,
  userLogin,
  userUpdate,
  userGet,
  forgotPass,
  userVerify,
  verifyForgotcode,
  userGetbyId,
} from "../controllers/auth_controller.js";
import { protect } from "../middleware/user_middleware.js";

routes.post("/user_signup", userSignup);
routes.put("/user_verify", userVerify);
routes.put("/user_update/:_id", userUpdate);
routes.get("/user_get", protect, userGet);
routes.get("/user_getbyid", protect, userGetbyId);
routes.post("/user_login", userLogin);
routes.put("/reset_password", forgotPass);
routes.put("/reset_passcode", verifyForgotcode);


export default routes;
