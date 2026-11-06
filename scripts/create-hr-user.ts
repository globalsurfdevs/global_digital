// scripts/create-hr-user.ts
// Run with `npm run create-hr` after setting HR_INITIAL_PASSWORD.

import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";
import mongoose from "mongoose";
import { hashPassword } from "../lib/password";

async function createHrUser() {
  try {
    await connectDB();

    const username = "hr"; // change if you want a different login username
    const plainPassword = process.env.HR_INITIAL_PASSWORD;
    if (
      !plainPassword ||
      plainPassword.length < 12 ||
      Buffer.byteLength(plainPassword, "utf8") > 72
    ) {
      throw new Error(
        "Set HR_INITIAL_PASSWORD to a unique password with at least 12 characters and no more than 72 UTF-8 bytes before running this script.",
      );
    }

    const existing = await User.findOne({ username });
    if (existing) {
      console.log(
        `User "${username}" already exists. Aborting to avoid overwrite.`,
      );
      process.exit(0);
    }

    const hrUser = await User.create({
      username,
      password: await hashPassword(plainPassword),
      role: "hr",
      isAdmin: false,
    });

    console.log("HR user created successfully with a hashed password:");
    console.log({
      id: hrUser._id.toString(),
      username: hrUser.username,
      role: hrUser.role,
    });

    process.exit(0);
  } catch (err) {
    console.error("Failed to create HR user:", err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

createHrUser();
