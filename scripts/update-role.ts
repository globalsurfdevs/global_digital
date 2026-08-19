// scripts/set-admin-role.ts
// Run with: npx tsx scripts/set-admin-role.ts

import connectDB from "../lib/mongodb";
import User from "../app/models/User";
import mongoose from "mongoose";

async function setAdminRole() {
  try {
    await connectDB();

    const username = "admin";

    const result = await User.updateOne(
      { username },
      { $set: { role: "admin" } },
    );

    if (result.matchedCount === 0) {
      console.log(`No user found with username "${username}".`);
    } else if (result.modifiedCount === 0) {
      console.log(`User "${username}" already has role set (no change made).`);
    } else {
      console.log(`Successfully set role: "admin" for user "${username}".`);
    }

    // Confirm the change
    const updatedUser = await User.findOne({ username });
    console.log("Current user document:", {
      id: updatedUser?._id.toString(),
      username: updatedUser?.username,
      role: updatedUser?.role,
      isAdmin: updatedUser?.isAdmin,
    });

    process.exit(0);
  } catch (err) {
    console.error("Failed to set admin role:", err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

setAdminRole();
