import NextAuth, { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER, NEXTAUTH_SECRET } = process.env;

if (!AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_ISSUER) {
  throw new Error("CRITICAL: Missing Auth0 environment variables in .env.local");
}

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
    }),
  ],
  secret: NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)