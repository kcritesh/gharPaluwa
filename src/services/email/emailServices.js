import jwt from "jsonwebtoken";
import FormData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(FormData);
import * as dotenv from "dotenv";
dotenv.config();
import User from "../../models/User.js";
import { orderConfirmationCustomerTemplate } from "./emailTemplates/orderConfirmationCustomer.js";
import numberToWords from "number-to-words";

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = {
      from: `Gharpaluwa <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to,
      subject,
      html,
    };
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return msg;
  } catch (error) {
    console.log("Error in send email", error);
    throw new Error(error);
  }
};

export const generateToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const sendVerificationEmail = async (email, token) => {
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
  return `http://dashboard.gharpaluwa.com/verify-email?token=${token}`;
};

export const sendOrderConfirmationEmailToCustomer = async (userId, order) => {
  try {
    // Find the user based on the userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    if (user.isEmailVerified === false) {
      throw new Error(`User with ID ${userId} has not verified their email.`);
    }
    const userEmail = user.email;
    const userFirstName = user.firstName;

    const orderItemsHTML = order.products
      .map(
        (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>Nrs. ${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
        `
      )
      .join("");
    const totalAmountWords = numberToWords.toWords(order.totalPrice);
    const emailTemplate = orderConfirmationCustomerTemplate
      .replace("[ORDER_ITEMS]", orderItemsHTML)
      .replace("[TOTAL]", `Nrs. ${order.totalPrice.toFixed(2)}`)
      .replace("[Customer Name]", userFirstName)
      .replace("[TOTAL IN WORDS]", totalAmountWords);

    await sendEmail({
      to: userEmail,
      subject: "Order Confirmation",
      html: emailTemplate,
    });

    console.log(`Email sent to ${userEmail}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const sendResetPasswordEmail = async (email, token) => {
  try {
    const data = {
      from: `Gharpaluwa <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to: [email],
      subject: "Reset Password",
      html: `<h3>Click the following link to reset your password: <a href=
    "${getPasswordResetLink(token)}">Reset Password</a></h3> `,
    };
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return msg;
  } catch (error) {
    throw new Error(error);
  }
};

const getPasswordResetLink = (token) => {
  return `http://dashboard.gharpaluwa.com/reset-password?token=${token}`;
};
