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
    const returnTo = "http://localhost:3000"

    window.location.href = `${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
  };

  return (
    <button onClick={handleLogout} className="bg-white px-4 py-2 rounded shadow">
      Sign out completely
    </button>
  );
}