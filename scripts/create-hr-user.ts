// scripts/create-hr-user.ts
// Run once with: npx tsx scripts/create-hr-user.ts
// (or `node --loader ts-node/esm scripts/create-hr-user.ts`, depending on your setup)

import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";
import mongoose from "mongoose";

async function createHrUser() {
  try {
    await connectDB();

    const username = "hr"; // change if you want a different login username
    const plainPassword = "hr@1234";

    const existing = await User.findOne({ username });
    if (existing) {
      console.log(`User "${username}" already exists. Aborting to avoid overwrite.`);
      process.exit(0);
    }


    const hrUser = await User.create({
      username,
      password: plainPassword,
      role: "hr",
      isAdmin: false,
    });

    console.log("HR user created successfully:");
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