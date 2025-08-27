import dotenv from "dotenv";
dotenv.config();

import { sendTemplateEmail } from "./src/utils/mail.js";
import { emailVerficationMailGen } from "./src/utils/template.js";

async function run() {
  const fakeUser = {
    name: "Aaryan",
    email: "test@example.com", // any dummy address works
  };

  const info = await sendTemplateEmail({
    to: fakeUser.email,
    subject: "Verify your email",
    templateBody: emailVerficationMailGen(fakeUser.name, "http://localhost:3000/verify?token=12345"),
  });

  console.log("Message sent:", info.messageId);
  console.log("Check your Mailtrap Sandbox inbox to view the email!");
}

run();
