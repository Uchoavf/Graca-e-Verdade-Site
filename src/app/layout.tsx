import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Graça & Verdade | Blog Bíblico e Teologia Cristã",
    template: "%s | Graça & Verdade",
  },
  description:
    "Artigos profundos sobre temas bíblicos, teologia cristã, vida espiritual e estudos das Escrituras. Um blog para edificação da fé e conhecimento da Palavra.",
  keywords: [
    "bíblia",
    "teologia",
    "estudos bíblicos",
    "vida cristã",
    "devoção",
    "escrituras",
    "fé",
    "graça",
  ],
  openGraph: {
    title: "Graça & Verdade | Blog Bíblico e Teologia Cristã",
    description:
      "Artigos profundos sobre temas bíblicos, teologia cristã, vida espiritual e estudos das Escrituras.",
    type: "website",
    locale: "pt_BR",
    siteName: "Graça & Verdade",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
