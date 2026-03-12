import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'; 

export default async function RedirectToUserChat() {
  const session = await auth();
  
  console.log("Processing redirect for:", session?.user?.email);

  if (!session?.user) {
    redirect("/");
  }

  const userSlug = session.user.email
    ? session.user.email.toLowerCase().replace(/[@.]/g, "-")
    : session.user.id;

  redirect(`/chats/${userSlug}`);
}