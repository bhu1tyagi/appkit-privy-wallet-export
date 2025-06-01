import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/PrivyProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Privy Wallet - Secure Solana Wallet with Key Export",
  description: "Create and manage your Solana wallet with Privy. Sign in with email or Google, and export your private keys securely. Built specifically for Solana.",
  keywords: "crypto wallet, embedded wallet, private key export, Privy, Solana, Web3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
