"use server";

export async function submitSupportTicket(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false };
  }

  // Log ticket for now — connect to email/CRM in production
  console.log("[Support Ticket]", { name, email, subject, message, company: formData.get("company") });

  return { success: true };
}
