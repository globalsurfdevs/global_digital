"use server";

import { supabase } from "@/app/lib/initSupabase";

export async function submitContact(formData: FormData) {
    try {
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

        const { error } = await supabase
            .from("contacts")
            .insert([data]);

        if (error) {
            console.error("Form submission failed", error);
            return { success: false };
        }

        return { success: true };
    } catch (err) {
        console.error("Server error:", err);
        return { success: false };
    }
}