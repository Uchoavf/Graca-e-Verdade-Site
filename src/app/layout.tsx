import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ewerton | Finanças, Automação & Tecnologia",
  description:
    "Economista e desenvolvedor. Consultoria financeira, automação de processos com IA e criação de sites modernos.",
  keywords: ["finanças", "automação", "sites", "economista", "consultoria", "IA", "tecnologia"],
  openGraph: {
    title: "Ewerton | Finanças, Automação & Tecnologia",
    description:
      "Economista e desenvolvedor. Consultoria financeira, automação de processos com IA e criação de sites modernos.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
