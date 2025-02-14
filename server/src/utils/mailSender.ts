import nodemailer from "nodemailer";
import { CustomError } from "./error/customError";

const mailSender = async (email: string, title: string, body: string) => {
  try {
    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send emails to users
    const info = await transporter.sendMail({
      from: "Pinterest Clone",
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (_error) {
    throw new CustomError("Error when sending Email", 500);
  }
};

export default mailSender;
