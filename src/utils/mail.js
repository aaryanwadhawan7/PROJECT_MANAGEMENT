// Generated mail template

import Mailgen from "mailgen";

// this fn will handle email verification buisness logic
const emailVerficationMailGen = (username, verificationURLPath) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app!",
      action: {
        instructions:
          "To verify your email, please click on the folowing button",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationURLPath,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};


const forgotPasswordMailGen = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your password!",
      action: {
        instructions:
          "To reset your password click on the following button!",
        button: {
          color: "#22BC66",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
    emailVerficationMailGen,
    forgotPasswordMailGen
}

