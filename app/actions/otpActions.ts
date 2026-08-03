"use server"

import { generateOtp } from "../helpers/generateOtp"
import dbConnect from "@/lib/mongodb"
import User from "../models/User"
import { EmailTemplate } from '../components/EmailTemplate/EmailTemplate';
import { Resend } from 'resend';
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";

const resend = new Resend(process.env.RESEND_API_KEY);

export const checkCurrentPass = async (currentPass: string) => {
    try {
        await dbConnect();

        const adminUser = await User.findOne({ _id: 1 });

        console.log(adminUser);

        if (adminUser && adminUser.otp == null) {

            const user = await User.findOne({ password: currentPass });

            if (user) {

                const generatedOtp = await generateOtp();

                console.log(generatedOtp, user._id);

                const { data: sendMail, error: emailError } = await resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>',
                    to: ['geeproa@gmail.com'],
                    subject: 'Hello world',
                    react: EmailTemplate({ otp: generatedOtp }),
                });

                if (emailError) {
                    console.log(emailError);
                    return { success: false, message: "Sending email failed" };
                }

                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    { otp: generatedOtp.toString() },
                    { new: true }
                );

                console.log(updatedUser);

                if (updatedUser) return { success: true, message: "Enter the otp below" }
                else return { success: false, message: "Something went wrong" }

            } else {
                return { success: false, message: "Incorrect password, try again" }
            }
        } else {
            return { success: false, message: "A recent activity to change the password was performed, please try again later" }
        }

    } catch (error) {
        console.log("Failed in checkCurrentPass", error)
        return { success: false, message: "Something went wrong" }
    }
}

export const checkOtp = async (enteredOtp: string) => {
    try {
        await dbConnect();

        const user = await User.findOne({ otp: enteredOtp });

        if (user) {
            return { success: true, message: "OTP was perfect, proceed to the next steps" }
        } else {
            return { success: false, message: "OTP was incorrect, Try again" }
        }

    } catch (error) {
        console.log("Failed in checkOtp", error)
        return { success: false, message: "Something went wrong" }
    }
}

export const changePass = async (newPass: string, id: string) => {
    try {
        await dbConnect();

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { password: newPass },
            { new: true }
        );

        if (updatedUser) {
            return { success: true, message: "Password was reset, logging off" }
        } else {
            return { success: false, message: "Reseting password failed, try again" }
        }

    } catch (error) {
        console.log("Failed in changePass", error)
        return { success: false, message: "Something went wrong" }
    }
}


export async function updateHrPassword(newPassword: string) {
  try {
    // Only an authenticated admin can call this — server-side enforcement,
    // not just a hidden UI section.
    const session = await auth();
    const callerRole = (session?.user as any)?.role;

    if (callerRole !== "admin") {
      return { success: false, message: "Not authorized." };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: "Password must be at least 6 characters." };
    }

    await connectDB();

    const hrUser = await User.findOne({ role: "hr" });

    if (!hrUser) {
      return { success: false, message: "No HR user found." };
    }

    hrUser.password = newPassword;
    await hrUser.save();

    return { success: true, message: "HR password updated successfully." };
  } catch (err) {
    console.error("Error updating HR password:", err);
    return { success: false, message: "Something went wrong." };
  }
}