const nodemailer = require("nodemailer");
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const transport = nodemailer.createTransport({
  auth: {
    user: process.env.nodemailer_email,
    pass: process.env.nodemailer_pass,
  },
  host: "smtp.gmail.com",
  tls: {
    rejectUnauthorized: false,
  },
});

const mailer = async ({ subject, html, to, text }) => {
  console.log(process.env.nodemailer_email);
  console.log(process.env.nodemailer_pass);

  await transport.sendMail({
    subject: subject || "Change Password Instagram",
    html: html || "",
    to: to || "suryanegarsinatriyya@gmail.com",
    text: text || "ini email untuk ubah password",
  });
};

module.exports = mailer;
