"use server";

import { getServerSession } from "next-auth/next";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export const getUsers = async () => {
  try {
    const session = await getServerSession(authOptions);

    await connectDB();

    const users = await User.find({ email: { $ne: session?.user?.email } });

    return JSON.parse(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
};
