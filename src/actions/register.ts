"use server";

import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const register = async (values: any) => {
  const { email, password, username, role } = values;

  try {
    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      role: role,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return true;
  } catch (e) {
    console.log(e);
  }
};
