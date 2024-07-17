import mongoose, { Schema, model } from "mongoose";

export enum Role {
  User = "user",
  Admin = "admin",
}

export interface UserDocument {
  _id: number;
  username: string;
  email: string;
  role: Role;
  progress: number[];
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.User,
    },
    progress: {
      type: [Number],
      default: [0],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);

export default User;
