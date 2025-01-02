import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { signupSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import * as nodemailer from "nodemailer";


export const signup = async (req: Request,res: Response) => {
  signupSchema.parse(req.body);
  const { name, phonenumber, email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
      new BadRequestsException("User already exists!", ErrorCode.USER_ALREADY_EXISTS);
  }

  user = await prismaClient.user.create({
    data: {
      name,
      phonenumber,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json( {message: "User created successfully!", success: true});
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestsException("Incorrect password!", ErrorCode.INCORRECT_PASSWORD);
  }

  const token = jwt.sign({ userId: user.id, role: user.role, name: user.name, email: user.email},JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});


  res.json({ user: {id: user.id, email: user.email, name: user.name, role: user.role}, token });
};

// me

export const me = async (req: Request, res: Response) => {
  const user = req.user;
  const {id, email, name, role} = user;
  res.json({id, email, name, role});
};
// when user tryed access to admin routes check using me middleware

//send-email

export const sendEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  // check user is created in db and check time is less than 2 minutes

  const user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const time = user.createdAt;
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - time.getTime();
  const twoMinutes = 2 * 60 * 1000;
  if(timeDifference > twoMinutes){
    throw new BadRequestsException("Time is more than 2 minutes", ErrorCode.UNPROCESSABLE_ENTITY);
  }

  if(!email){
    throw new BadRequestsException("Email is required", ErrorCode.UNPROCESSABLE_ENTITY);
  }

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
           
            .container {
                max-width: 600px;
                margin: 0 auto;
                font-family: Arial, sans-serif;
                color: #333333 !important;
            }
            .header {
                background-color: #4F46E5 !important;
                padding: 30px;
                text-align: center;
                color: white;
            }
            .content {
                padding: 30px;
                line-height: 1.6;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #4F46E5;
                color: white !important;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #666666 !important;
            }
            .benefits {
                margin: 20px 0;
                padding: 0;
                color: #4F46E5 !important;
            }
            .benefits li {
                margin: 10px 0;
                padding-left: 20px;
                position: relative;
                color: #4F46E5 !important;
            }
            .benefits li:before {
                content: "•";
                color: #4F46E5 !important;
                position: absolute;
                left: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to MoneyLoyal!</h1>
            </div>
            <div class="content">
                <p>Dear ${user.name},</p>
                <p>Welcome to MoneyLoyal – your gateway to exclusive rewards and amazing savings!</p>
                
                <h2>Why Choose MoneyLoyal?</h2>
                <ul class="benefits">
                    <li>Earn points with every purchase</li>
                    <li>Exclusive access to premium offers</li>
                    <li>Special discounts from our partner merchants</li>
                    <li>Easy point redemption system</li>
                    <li>Real-time rewards tracking</li>
                </ul>

                <p>Ready to start earning rewards? Click below to explore our latest offers:</p>
                
                <center>
                    <a href="${process.env.FRONTEND_URL}/dashboard" class="button">
                        Explore Offers Now
                    </a>
                </center>

                <p>Have questions? Our dedicated support team is here to help!</p>
                
                <p>Best regards,<br>The MoneyLoyal Team</p>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} MoneyLoyal. All rights reserved.</p>
                <p>This email was sent to you because you registered with MoneyLoyal.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const transporter = nodemailer.createTransport({
    host: `email-smtp.${process.env.AWS_REGION}.amazonaws.com`,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${process.env.EMAIL_NAME}" <${process.env.RECIPIENT_EMAIL}>`,
    to: email,
    subject: process.env.EMAIL_SUBJECT,
    html: htmlTemplate, // Using html instead of text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!", success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new BadRequestsException(
      "Failed to send email", 
      ErrorCode.EMAIL_SENDING_FAILED
    );
  }
};

