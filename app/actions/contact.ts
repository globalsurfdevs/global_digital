"use server";

import connectDb from "@/lib/mongodb";
// import { supabase } from "@/app/lib/initSupabase";
import Contact from "../models/Contact";
import { getToEmail } from "../helpers/getToEmail";
import { sendMailWithAttachments } from "../helpers/sendMailWithAttatchments";

export async function submitContact(formData: FormData) {
    try {
        await connectDb()
        const data = {
            name: formData.get("SingleLine") as string,
            email: formData.get("Email") as string,
            company: formData.get("SingleLine1") as string,
            phone: formData.get("PhoneNumber_countrycode") as string,
            budget: formData.get("Dropdown") as string,
            service: formData.get("Dropdown1") as string,
            message: formData.get("MultiLine") as string,
            page_url: formData.get("SingleLine2") as string,
        };

        // const { error } = await supabase
        //     .from("contacts")
        //     .insert([data]);

        // if (error) {
        //     console.error("Form submission failed", error);
        //     return { success: false };
        // }

        const contact = await Contact.create(data)


        if (!contact) {
            console.error("Form submission failed");
            return { success: false };
        }

        const toEmail = await getToEmail("contact");

        await sendMailWithAttachments({
            type: "contact",
            to: toEmail,
            subject: `New Contact Application: ${data.name}`,
            fields: data,
        });

        return { success: true };

    } catch (err) {
        console.error("Server error:", err);
        return { success: false };
    }
}