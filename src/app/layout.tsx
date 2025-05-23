import React from "react";
import localFont from "next/font/local";
import "../styles/global.scss";
import { SnackbarProvider } from "@/context/SnackbarContext";
import Snackbar from "@/components/Snackbar";
import { ModalProvider } from "@/context/ModalContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ModalProvider>
          <SnackbarProvider>
            {children}
            <Snackbar />
          </SnackbarProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
