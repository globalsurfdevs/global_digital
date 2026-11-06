"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";
import { hashPassword, verifyAndUpgradePassword } from "@/lib/password";

function isStrongEnough(password: string): boolean {
  return password.length >= 12 && Buffer.byteLength(password, "utf8") <= 72;
}

/** Change the signed-in user's password after confirming their current one. */
export async function changeOwnPassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { success: false, message: "Please sign in again." };
    if (!isStrongEnough(newPassword)) {
      return {
        success: false,
        message: "Use at least 12 characters and no more than 72 UTF-8 bytes.",
      };
    }

    await connectDB();
    const user: any = await User.findById(userId).select("+password");
    if (!user || user.isActive === false) {
      return { success: false, message: "Please sign in again." };
    }

    const verification = await verifyAndUpgradePassword(
      currentPassword,
      user.password,
    );
    if (!verification.valid) {
      return { success: false, message: "Current password is incorrect." };
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    return { success: true, message: "Password updated. Please sign in again." };
  } catch {
    return { success: false, message: "Password update failed." };
  }
}

/** An admin may reset the HR account; the new password is still hashed. */
export async function updateHrPassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const session = await auth();
    if ((session?.user as any)?.role !== "admin" || !session.user.id) {
      return { success: false, message: "Not authorized." };
    }
    if (!isStrongEnough(newPassword)) {
      return {
        success: false,
        message: "Use at least 12 characters and no more than 72 UTF-8 bytes.",
      };
    }

    await connectDB();
    const adminUser: any = await User.findById(session.user.id).select(
      "+password",
    );
    if (!adminUser || adminUser.isActive === false) {
      return { success: false, message: "Not authorized." };
    }
    const verification = await verifyAndUpgradePassword(
      currentPassword,
      adminUser.password,
    );
    if (!verification.valid) {
      return { success: false, message: "Current password is incorrect." };
    }

    const hrUser = await User.findOne({ role: "hr" });
    if (!hrUser) return { success: false, message: "No HR user found." };

    hrUser.password = await hashPassword(newPassword);
    await hrUser.save();
    return { success: true, message: "HR password updated successfully." };
  } catch {
    return { success: false, message: "Password update failed." };
  }
}
