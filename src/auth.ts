import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongo/connect"
import Auth0 from "next-auth/providers/auth0"
import { z } from "zod"

const envSchema = z.object({
  AUTH0_CLIENT_ID: z.string().min(1, "AUTH0_CLIENT_ID is required"),
  AUTH0_CLIENT_SECRET: z.string().min(1, "AUTH0_CLIENT_SECRET is required"),
  AUTH0_ISSUER: z.string().min(1, "AUTH0_ISSUER must be a valid URL"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"), 
});

console.log("Validating Issuer:", process.env.AUTH0_ISSUER);

const env = envSchema.parse(process.env);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Auth0({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
    }),
  ],
  secret: env.AUTH_SECRET, 
})