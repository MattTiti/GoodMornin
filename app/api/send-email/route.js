import { NextResponse } from "next/server";
import { sendEmail } from "@/libs/mailgun";

export async function POST(req) {
  try {
    const { to, subject, text, html } = await req.json();

    await sendEmail({ to, subject, text, html });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
