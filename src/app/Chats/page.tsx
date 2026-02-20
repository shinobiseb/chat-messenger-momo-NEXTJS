// src/app/chats/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RedirectToUserChat() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const userSlug = session.user.name
    ? session.user.name.toLowerCase().replace(/\s+/g, "-")
    : session.user.id;

  redirect(`/chats/${userSlug}`);

    //Schema for session
    //   {
    //   user: {
    //     id: '699362920ab017fad7bc3fd5',
    //     name: 'Ney Sebastian Patin',
    //     email: 'sebpatin@gmail.com',
    //     image: 'https://lh3.googleusercontent.com/a/ACg8ocLE23q-ZmxIX7mKDsUTP0kBJg3ry4THXt85VAaFm5yI-N8ExMnvEg=s96-c',
    //     emailVerified: null
    //   },
    //   id: '699362930ab017fad7bc3fd7',
    //   sessionToken: 'b8e8e591-8230-4af2-a2d4-f483632ad8dd',
    //   userId: '699362920ab017fad7bc3fd5',
    //   expires: '2026-03-22T19:08:10.326Z'
    // }
}