// src/app/chats/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RedirectToUserChat() {
  const session = await auth();

  // 1. If not logged in, boot them to the home page
  if (!session?.user) {
    redirect("/");
  }

  const userSlug = session.user.name
    ? session.user.name.toLowerCase().replace(/\s+/g, "-")
    : session.user.id;

  redirect(`/chats/${userSlug}`);
}