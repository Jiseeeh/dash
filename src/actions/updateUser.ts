"use server";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const updateUser = async (values: any) => {
  const { originalEmail, email: newEmail, username, role } = values;

  console.log({ valuesFrom: values });

  try {
    await connectDB();

    var res = await User.updateOne(
      { email: originalEmail },
      { $set: { email: newEmail, username, role } }
    );

    console.log({ res });

    return true;
  } catch (e) {
    console.error(e);
  }
};
