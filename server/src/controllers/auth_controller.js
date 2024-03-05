import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../middleware/email_send.js";
import { User } from "../models/user.js";
import { generateActivationCode } from "../utils/index.js";

export const userSignup = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  try {
    let existingUser = await User.findOne({ email,email_verified:true });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const activationCode = generateActivationCode();
    await sendMail(
      email,
      "Email Verification Code ",
      `<h2>Code :</h2>
    ${activationCode} `
    );

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      ...req.body,
      password: hashedPassword,
      verification_code:activationCode
    });
    await user.save();
    res.status(200).json({ message: "Opt send to your email please verify",userId:user._id });
  } catch (error) {
    res.status(400).json({ error: `Something went wrong: ${error.message}` });
  }
};


export const userVerify = async (req, res) => {
  const { verification_code, _id } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "user id is required" });
  }
  if (!verification_code) {
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck = await User.findById(_id);
    if (userCheck.verification_code !== verification_code) {
      return res.status(400).json({ error: "please enter valid code" });
    }
      await User.findByIdAndUpdate(_id, {
        verification_code: null,
        email_verified: true,
      });
    res.status(200).json({ message: "verified email successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please add email or password" });
  }
  User.findOne({email,email_verified:true})
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(400).json({ error: "Invalid Email or Password " });
      }
      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          savedUser.password = undefined;
          res.json({ message: "Successfull Login", token, user: savedUser });
        } else {
          return res.status(400).json({ error: "Invalid Email or Password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const userUpdate = async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  let passwordUpdate = false;
  let newPassword;
  if (password) {
    passwordUpdate = true;
    newPassword = await bcrypt.hash(password, 12);
  }
  try {
    const updateData = passwordUpdate
      ? { ...req.body, password: newPassword }
      : req.body;
    const response = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(200).json({ message: "updated successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};


export const userGet = async (req, res) => {
  let filter = { email_verified: true };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  try {
    let result = await User.find(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userGetbyId = async (req, res) => {
  let filter = { email_verified: true };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  try {
    let result = await User.findById(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

//   forgot password

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "please enter email" });
  }
  try {
    let userData = await User.findOne({ email,email_verified:true });
    if (!userData) {
      return res.status(400).json({ error: "email not found" });
    }

    const activationCode = generateActivationCode();

    await sendMail(
      email,
      "Verification Code ",
      `<h2>Code :</h2>
    ${activationCode} `
    )
    let _id = userData._id;
    await User.findByIdAndUpdate(_id, { resetCode: activationCode });
    res
      .status(200)
      .json({ message: "code send to your email", userId: _id });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

// verify forgot code

export const verifyForgotcode = async (req, res) => {
  const { resetCode, _id } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "user id is required" });
  }
  if (!resetCode) {
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck = await User.findById(_id);
    if (userCheck.resetCode !== resetCode) {
      return res.status(400).json({ error: "please enter valid code" });
    }
    await User.findByIdAndUpdate(_id, { resetCode: null });
    userCheck.password = undefined;
    res
      .status(200)
      .json({ message: "Please enter your new password", user: userCheck });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

