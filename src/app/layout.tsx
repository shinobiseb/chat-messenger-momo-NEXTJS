import type { Metadata } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
// @ts-ignore
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
const chakraPetch = Chakra_Petch({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Mauchat",
  description: "Chat Messaging Application by Ney Sebastian Patin",
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
    <html lang="en" className="bg-black bg-grid-pattern">
      <body className={chakraPetch.className}>
        {children}
      </body>
    </html>
  );
}