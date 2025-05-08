import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthModal from "./provider/authmodal";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import { AuthProvider } from "./contexts/authcontext";
import { ModalProvider } from "./contexts/ModalContext";
import QueryProvider from "./provider/QueryProvider";





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Builder App",
  description: "Build your resume effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      
     <QueryProvider>
    <AuthProvider>
  <ModalProvider>
    <Toaster position="top-center" />
    <Navbar />
    <AuthModal />
    {children}
  </ModalProvider>
</AuthProvider>
</QueryProvider>
      </body>
    </html>
  );
}
