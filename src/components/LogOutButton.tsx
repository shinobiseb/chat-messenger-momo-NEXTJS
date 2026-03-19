"use client"
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  const handleLogout = async () => {
    document.cookie = "authjs.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "authjs.callback-url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "authjs.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    await signOut({ redirect: false });

    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    const returnTo = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mauchat.vercel.app/"

    window.location.href = `${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
  };

  return (
    <button onClick={handleLogout} className="bg-white hover:bg-orange hover px-4 py-2 shadow mt-4 transition-colors w-40 self-center">
      Sign out
    </button>
  );
}