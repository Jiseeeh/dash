"use server";

import User, { UserDocument } from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const getUser = async (id: string) => {
  try {
    await connectDB();

    const user: UserDocument | null = await User.findOne({ _id: id });

    return JSON.parse(JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
};
