"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const deleteUser = async (id: any) => {
  try {
    await connectDB();

    await User.deleteOne({
      _id: id,
    });

    return true;
  } catch (e) {
    console.log(e);
  }
};
