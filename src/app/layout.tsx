import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hanteo Chart",
  description: "Hanteo Chart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} flex min-h-dvh flex-col bg-neutral-200 font-sans antialiased`}
      >
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
