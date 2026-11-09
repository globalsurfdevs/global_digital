import connectDB from "../lib/mongodb";
import User from "../app/models/User";
import { hashPassword } from "../lib/password";
import mongoose from "mongoose";

async function createAdminUser() {
  try {
    const username = process.env.ADMIN_USERNAME?.trim();
    const password = process.env.ADMIN_INITIAL_PASSWORD;

    if (
      !username ||
      !password ||
      password.length < 12 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      throw new Error(
        "Set ADMIN_USERNAME and ADMIN_INITIAL_PASSWORD (12+ characters, at most 72 UTF-8 bytes).",
      );
    }

    await connectDB();
    const existing = await User.findOne({ username });
    if (existing) throw new Error(`User "${username}" already exists.`);

    const user = await User.create({
      username,
      password: await hashPassword(password),
      role: "admin",
      isAdmin: true,
      isActive: true,
    });

    console.log(`Admin account "${user.username}" created with a hashed password.`);
  } catch (error) {
    console.error("Failed to create admin account:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

void createAdminUser();
