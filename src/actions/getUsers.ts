"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const getUsers = async () => {
  try {
    await connectDB();

    const users = await User.find({});

    return JSON.parse(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
};
