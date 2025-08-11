import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/sidebar";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OnlineMed",
  description: "Step 3/9 page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.className}>
      <body className="antialiased text-foreground">
        <div className="flex flex-row h-screen w-screen bg-background-alt p-2 gap-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-background rounded-3xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
