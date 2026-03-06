"use server";

import connectDb from "@/lib/mongodb";
import Contact from "../models/Contact";
import { uploadToDropbox } from "../lib/uploadToDropbox";
import Career from "../models/Career";

export async function submitCareer(formData: FormData) {
    try {
        await connectDb();
        const resume = formData.get("FileUpload") as File | null;
        let filePath;
        if (resume && resume.size > 0) {
            const filename = `${Date.now()}-${resume.name || "resume"}`;
            const dropboxPath = `/resume/${formData.get("SingleLine")}/${filename}`;
            filePath = await uploadToDropbox(resume, dropboxPath);
        }

        const data = {
            name: formData.get("SingleLine") as string,
            email: formData.get("Email") as string,
            jobTitle: formData.get("SingleLine1") as string,
            experience: formData.get("SingleLine2") as string,
            currentSalary: formData.get("SingleLine3") as string,
            expectedSalary: formData.get("SingleLine4") as string,
            noticePeriod: formData.get("SingleLine5") as string,
            phone: formData.get("PhoneNumber_countrycode") as string,
            resume: filePath
        };

        // (Optional) you can process the file here if needed


        const career = await Career.create(data);

        if (!career) {
            console.error("Form submission failed");
            return { success: false };
        }

        return { success: true };

    } catch (err) {
        console.error("Server error:", err);
        return { success: false };
    }
}