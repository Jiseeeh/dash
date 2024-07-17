"use server";

import User, { UserDocument } from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { mockData } from "@/data/mock";
import { getRandomDate } from "@/lib/utils";

export const addMockData = async () => {
  try {
    await connectDB();

    const data: any = mockData.map(
      (user: Omit<UserDocument, "createdAt" | "updatedAt" | "_id">) => {
        return {
          ...user,
          password:
            "$2a$10$JYbyYA8FceCfP7O6y1qV2./8Xp.N99WmAUJdLm0UNV5IHT.5.2cBS",
          createdAt: getRandomDate(),
          updatedAt: getRandomDate(),
        };
      }
    );

    await User.insertMany(data);

    return true;
  } catch (e) {
    console.log(e);
  }
};
