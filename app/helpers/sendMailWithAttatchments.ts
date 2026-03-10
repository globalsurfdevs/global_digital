import { resend } from "./mailer";
import { CareerTemplate } from "../../templates/careerTemplate";
import type { ReactElement } from "react";

interface Attachment {
  filename: string;
  content: string; // base64
}

export async function sendMailWithAttachments({
  to,
  subject,
  fields,
  attachments,
}: {
  to: string | string[];
  subject: string;
  fields: any;
  attachments: Attachment[];
}) {
  const { data, error } = await resend.emails.send({
    from: "Enquiry <enquiry@globalsurf.ae>",
    to,
    subject,
    react: CareerTemplate(fields) as ReactElement,
    attachments,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send email");
  }

  return data;
}
