import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Óticas Vizz | Estilo e Visão",
  description: "Enxergue o mundo com clareza e estilo. Lentes multifocais de alta tecnologia e armações exclusivas.",
  icons: {
    icon: [
      { url: "/images/logo.webp", type: "image/webp" },
    ],
    shortcut: "/images/logo.webp",
    apple: "/images/logo.webp",
  }
};

export const viewport: Viewport = {
  themeColor: "#262626",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
