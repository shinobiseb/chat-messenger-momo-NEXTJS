"use server"
import { signOut } from "@/auth";

export async function handleSignOut() {
  // Use your Auth0 domain (e.g. dev-xxxx.us.auth0.com)
  const domain = process.env.AUTH0_DOMAIN; 
  const clientId = process.env.AUTH0_CLIENT_ID;
  
  // This must match exactly what you put in "Allowed Logout URLs"
  const returnTo = encodeURIComponent("http://localhost:3000/");

  // Construct the "Federated Logout" URL
  const auth0LogoutUrl = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`;

  // This clears your local cookie AND sends the user to Auth0 to clear theirs
  await signOut({ redirectTo: auth0LogoutUrl });
}