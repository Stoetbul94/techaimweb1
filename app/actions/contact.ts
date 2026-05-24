"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false };
  }

  console.log("[Contact Form]", {
    name,
    email,
    message,
    company: formData.get("company"),
    phone: formData.get("phone"),
    intent: formData.get("intent"),
  });

  return { success: true };
}
