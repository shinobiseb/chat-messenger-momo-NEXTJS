"use server"
import { signOut } from "@/auth";

export async function handleSignOut() {
  const domain = process.env.AUTH0_DOMAIN; 
  const clientId = process.env.AUTH0_CLIENT_ID;
  
  // Ensure this matches your Auth0 "Allowed Logout URLs" exactly
  const returnTo = process.env.NODE_ENV === "development" 
    ? "http://localhost:3000" 
    : "https://mauchat.vercel.app";

  // Construct the Auth0 Federated Logout URL
  const auth0LogoutUrl = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;

  // 1. Clear the local Next.js session
  // 2. Redirect the user's BROWSER to the Auth0 logout endpoint
  await signOut({ 
    redirectTo: auth0LogoutUrl 
  });
}
