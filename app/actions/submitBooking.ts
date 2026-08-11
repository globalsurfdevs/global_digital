"use server";

import connectDb from "@/lib/mongodb";
import Lead from "../models/Lead";
// import { sendMailWithAttachments } from "../helpers/sendMailWithAttatchments";
// import { getToEmail } from "../helpers/getToEmail";

export async function submitBooking(formData: FormData) {
    try {
        await connectDb();

        const data = {
            name: formData.get("name") as string,
            company: formData.get("company") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            sector: formData.get("sector") as string,
        };

        if (!data.name || !data.company || !data.email || !data.sector) {
            return { success: false, message: "Please complete the required fields." };
        }

        const lead = await Lead.create(data);

        // const toEmail = await getToEmail("booking");
        // const emails = toEmail.split(",").map((e: string) => e.trim());

        // await sendMailWithAttachments({
        //     type: "booking",
        //     to: emails[0],
        //     cc: emails.slice(1),
        //     subject: `New Call Booking: ${data.name}`,
        //     fields: data,
        //     attachments: [],
        // });

        if (!lead) {
            console.error("Booking submission failed");
            return { success: false, message: "Something went wrong. Please try again." };
        }

        return { success: true, message: "Thanks — we'll be in touch shortly to schedule your call." };

    } catch (err) {
        console.error("Server error:", err);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}