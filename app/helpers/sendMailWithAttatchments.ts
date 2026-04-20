import { resend } from "./mailer";
import { CareerTemplate } from "../../templates/careerTemplate";
import type { ReactElement } from "react";
import { ContactTemplate } from "@/templates/contactTemplate";

interface Attachment {
  filename: string;
  content: string; // base64
}

export async function sendMailWithAttachments({
  type,
  to,
  cc,
  subject,
  fields,
  attachments,
}: {
  type: string;
  to: string | string[];
  cc: string | string[];
  subject: string;
  fields: any;
  attachments?: Attachment[];
}) {

  if (type == "career") {
    const { error } = await resend.emails.send({
      from: "Enquiry <enquiry@globalsurf.ae>",
      to,
      subject,
      cc,
      react: CareerTemplate(fields) as ReactElement,
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }
  } else {
    const { error } = await resend.emails.send({
      from: "Enquiry <enquiry@globalsurf.ae>",
      to,
      cc,
      subject,
      react: ContactTemplate(fields) as ReactElement,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }
  }
}
