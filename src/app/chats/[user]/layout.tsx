import Sidebar from '@/components/Sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SessionProvider } from "next-auth/react"

export default async function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ user: string }>; 
}) {

  const session = await auth();

  if (!session?.user) {
    console.warn("No Session")
    redirect('/login');
  }



  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar user={session.user} />
      <section className="flex-1 h-full overflow-hidden">
        {/* Pass the session to the provider so client components can use useSession() */}
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
      </section>
    </div>
  );
}