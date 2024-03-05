import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dbdxsvxda/image/upload/v1699548736/niegbour_proj/dkpfjfhrzfz0xkr3ck1v.png",
    },
    reminder: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default:true
    },
    email_verified: {
      type: Boolean,
      default:false
    },
    verification_code: {
      type: String,
    },
    resetCode: String,
    expireToken: Date,
  },
  { timestamps: true }
);
export const User = mongoose.model("user", UserSchema);
