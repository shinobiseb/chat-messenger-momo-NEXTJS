import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { UserStateProvider } from "../lib/UserStateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mauchat",
  description: "Chat Messaging Application by ShinobiSeb",
  icons: {
    icon: 'https://www.svgrepo.com/show/302639/message.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black bg-cover">
      <body className={inter.className}>
        <UserStateProvider>
          {children}
        </UserStateProvider>
      </body>
    </html>
  );
}