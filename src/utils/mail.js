// Generated mail template

import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config ();

const transporter = nodemailer.createTransport({
  host: process.env.MT_SMTP_HOST,
  port: Number(process.env.MT_SMTP_PORT),
  auth: {
    user: process.env.MT_SMTP_USER,
    pass: process.env.MT_SMTP_PASSWORD,
  },
});


const mailgen = new Mailgen ({
  theme : 'default',
  product : {
    name : process.env.MAIL_FROM_NAME,
    link : process.env.APP_URL
  }
})

export async function sendTemplateEmail({ to, subject, templateBody }) {
  const html = mailgen.generate(templateBody);
  const text = mailgen.generatePlaintext(templateBody);

  return transporter.sendMail({
    from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`,
    to,
    subject,
    html,
    text,
  });
}


