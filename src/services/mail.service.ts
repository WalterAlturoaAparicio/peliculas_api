import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";
import { errorService } from "./error.service";
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_AUTH = process.env.EMAIL_AUTH;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async function mailService(emailToSend: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_AUTH,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    } as TransportOptions);

    const mailOptions = {
      from: `no-reply pls <${EMAIL_AUTH}>`,
      to: emailToSend,
      subject: "Bienvenid@ a la Api De Peliculas",
      html: "<h1>Bienvenid@ a la Api De Peliculas</h1>",
    };
    return transport.sendMail(mailOptions);
  } catch (error) {
    errorService(error);
  }
}
