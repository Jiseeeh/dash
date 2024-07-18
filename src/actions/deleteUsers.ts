"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const deleteUsers = async (ids: string[]) => {
  try {
    await connectDB();

    await User.deleteMany({ _id: { $in: ids } });

    return true;
  } catch (e) {
    console.log(e);
  }
};
