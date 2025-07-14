import { Mona_Sans as MonaSansFont } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const monaSans = MonaSansFont({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepWise Mock Interview",
  keywords: ["mock interview", "prepwise", "interview preparation"],
  description: "An AI-powered mock interview platform to help you prepare for your next job interview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern` }>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
