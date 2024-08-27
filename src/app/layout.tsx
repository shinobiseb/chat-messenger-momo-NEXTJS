import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
    <UserStateProvider>
      <html lang="en" className="bg-background-svg">
        <body className={inter.className}>{children}</body>
      </html>
    </UserStateProvider>
  );
}
