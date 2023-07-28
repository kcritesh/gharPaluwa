import jwt from "jsonwebtoken";
import FormData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(FormData);
import * as dotenv from "dotenv";
dotenv.config();

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const sendVerificationEmail = async (email, token) => {
  try {
    const data = {
      from: `Gharpaluwa <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to: [email],
      subject: "Email Verification",
      html: `<h3>Click the following link to verify your email: <a href=
    "${getVerificationLink(token)}">Verify Email</a></h3> `,
    };
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return msg;
  } catch (error) {
    console.log("Error in send verification email", error);
    throw new Error(error);
  }
};

const getVerificationLink = (token) => {
  return `http://gharpaluwa.com/verify-email?token=${token}`;
};

export { generateToken, sendVerificationEmail };
