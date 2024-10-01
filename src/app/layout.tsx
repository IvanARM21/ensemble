import type { Metadata } from "next";
import { Jost } from 'next/font/google'
import "./globals.css";

const jost = Jost({ weight: ["400", "500", "600", "700", "900"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add font to className, also add antialiased and dark mode
    <html lang="en" className={`${jost.className}`}>
      <body>{children}</body>
    </html>
  );
}