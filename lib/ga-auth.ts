import { google } from "googleapis";
import { prisma } from "./prisma";

const GA_CLIENT_ID = process.env.GA_CLIENT_ID || "";
const GA_CLIENT_SECRET = process.env.GA_CLIENT_SECRET || "";
const GA_REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/analytics/callback`
  : "http://localhost:3000/api/admin/analytics/callback";

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
];

export function getOAuth2Client() {
  return new google.auth.OAuth2(GA_CLIENT_ID, GA_CLIENT_SECRET, GA_REDIRECT_URI);
}

export function getAuthUrl(): string {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
}

export async function getAuthenticatedClient() {
  const token = await prisma.gaToken.findUnique({ where: { id: "ga_oauth" } });
  if (!token) return null;

  const client = getOAuth2Client();
  client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
    expiry_date: token.expiresAt.getTime(),
  });

  // トークン期限切れなら自動リフレッシュ
  if (token.expiresAt.getTime() < Date.now()) {
    const { credentials } = await client.refreshAccessToken();
    await prisma.gaToken.update({
      where: { id: "ga_oauth" },
      data: {
        accessToken: credentials.access_token!,
        expiresAt: new Date(credentials.expiry_date!),
      },
    });
    client.setCredentials(credentials);
  }

  return client;
}
