const sgMail = require("@sendgrid/mail");

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY || "");

const mailTemplate = ({ password }) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Account Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666666;
            text-align: center;
        }
    </style>
</head>
    <body>
    <div class="container">
        <div class="header">
            <h1>Your Account Password</h1>
        </div>
        <div class="content">
            <p>Dear PLAI,</p>
            <p>I hope this email finds you well.</p>
            <p>As requested, below are the details of your new account password. For your security, please change your password after your initial login.</p>
            <p><strong>Username:</strong> goplai2024@gmail.com</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>To ensure the safety and security of your account, please follow these guidelines:</p>
            <ul>
                <li>Change your password immediately after logging in for the first time.</li>
                <li>Choose a strong password that includes a mix of letters, numbers, and special characters.</li>
                <li>Do not share your password with anyone.</li>
                <li>If you suspect any unauthorized access, please contact us immediately.</li>
            </ul>
            <p>To change your password, log in to your account and navigate to the "Settings" or "Account" section where you will find the option to update your password.</p>
            <p>If you have any questions or need further assistance, feel free to reach out.</p>
            <p>Best regards,</p>
            <p>Baza Trainee Ukraine</p>
        </div>
        <div class="footer">
            <p>&copy; 2024  All rights reserved.</p>
        </div>
    </div>
</body>
  </html>`;

const sendEmail = ({ email, password }) => {
  const forgotPassword = {
    to: email,
    subject: "Password",
    html: mailTemplate({ password }),
  };

  sgMail
    .send({ ...forgotPassword, from: "geri-grej2023@rambler.ru" })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
