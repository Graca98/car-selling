// Nodemailer transport pro Brevo SMTP (bere údaje z .env.local, exportuje FROM/TO).
// https://nodemailer.com/usage/
// https://help.brevo.com/hc/en-us/articles/209467485
import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465, // 465 = TLS, jinak STARTTLS
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export const FROM_EMAIL = process.env.FROM_EMAIL!;
export const TO_EMAIL = process.env.TO_EMAIL!;
