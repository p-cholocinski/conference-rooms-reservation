import type { Metadata } from "next";
import "./globals.css";
import "@/styles/toast.css";
import ToastContainer from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: "Conference rooms reservation",
  description: "Crated by Piotr Chołociński",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
