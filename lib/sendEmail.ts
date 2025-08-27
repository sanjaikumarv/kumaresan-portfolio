"use server"

import nodemailer from "nodemailer"

export async function sendEmail(formData: any) {
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
        throw new Error("All fields are required")
    }

    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: "500ea9003@smtp-brevo.com",
            pass: "HzNSMKs5qUAtE8OY",
        },
    })

    try {
        await transporter.sendMail({
            from: `500ea9003@smtp-brevo.com`,
            to: "kumaresanraj388@gmail.com",
            subject: `Portfolio Contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
            html: `
        <div>
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
        });
        return { success: true }
    } catch (error) {
        throw new Error("Failed to send email")
    }
}
