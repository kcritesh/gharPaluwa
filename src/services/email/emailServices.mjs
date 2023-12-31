import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import numberToWords from 'number-to-words';
import { orderConfirmationCustomerTemplate } from './emailTemplates/orderConfirmationCustomer.mjs';
import User from '../../models/User.js';

const mailgun = new Mailgun(FormData);
dotenv.config();

const mg = mailgun.client({
  username: 'api',
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
    throw new Error(error);
  }
};

export const generateToken = (email) =>
  jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });

const getVerificationLink = (token) =>
  `http://dashboard.gharpaluwa.com/verify-email?token=${token}`;
export const sendVerificationEmail = async (email, token) => {
  try {
    const data = {
      from: `Gharpaluwa <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to: [email],
      subject: 'Email Verification',
      //   html: `<h3>Click the following link to verify your email: <a href=
      // "${getVerificationLink(token)}">Verify Email</a></h3> `,
      html: `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <style>
        /* Inline CSS for better email client compatibility */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: white !important;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 20px;
            font-weight: bold;
        }
        a.button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Confirmation</h1>
        <p>Welcome to our platform! We're excited to have you on board.</p>
        <p>Please click the button below to confirm your email address:</p>
        <a class="button" href="${getVerificationLink(
          token
        )}">Confirm Your Email</a>
    </div>
</body>
</html>

    `,
    };
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return msg;
  } catch (error) {
    throw new Error(error);
  }
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
      .join('');
    const totalAmountWords = numberToWords.toWords(order.totalPrice);
    const emailTemplate = orderConfirmationCustomerTemplate
      .replace('[ORDER_ITEMS]', orderItemsHTML)
      .replace('[TOTAL]', `Nrs. ${order.totalPrice.toFixed(2)}`)
      .replace('[Customer Name]', userFirstName)
      .replace('[TOTAL IN WORDS]', totalAmountWords);

    await sendEmail({
      to: userEmail,
      subject: 'Order Confirmation',
      html: emailTemplate,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getPasswordResetLink = (token) =>
  `http://dashboard.gharpaluwa.com/reset-password?token=${token}&reset=true`;

export const sendResetPasswordEmail = async (email, token) => {
  try {
    const data = {
      from: `Gharpaluwa <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to: [email],
      subject: 'Reset Password',
      html: `<h3>Click the following link to reset your password: <a href=
    "${getPasswordResetLink(token)}">Reset Password</a></h3> `,
    };
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return msg;
  } catch (error) {
    throw new Error(error);
  }
};
