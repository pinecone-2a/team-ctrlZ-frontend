import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/app/_components/sidebar";
import Dashboard from "./page";
import Header from "./Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}</body>
    </html>
  );
}
