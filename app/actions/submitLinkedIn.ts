"use server";

import connectDb from "@/lib/mongodb";
import LinkedinSubmission from "@/app/models/Linkedin";

export async function submitLinkedIn(formData: FormData) {
  try {
    await connectDb();

    const linkedinUrl = formData.get("linkedinUrl") as string;
    const agreed = formData.get("agree") === "on";

    if (!linkedinUrl || !agreed) {
      console.error("Missing required fields");
      return { success: false };
    }

    const entry = await LinkedinSubmission.create({ linkedinUrl, agreed });

    if (!entry) {
      console.error("Form submission failed");
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error("Server error:", err);
    return { success: false };
  }
}