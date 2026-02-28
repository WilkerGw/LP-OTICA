import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

import DynamicChat from "@/components/chat/DynamicChat";
import { SchemaOrg } from "@/components/SchemaOrg";

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
  metadataBase: new URL("https://www.oticasvizz.com.br"),
  title: "Óticas Vizz | Óculos de Grau e Lentes na Zona Leste de São Paulo",
  description:
    "Óticas Vizz na Av. do Oratório, 4869 – Zona Leste SP. Armações, lentes multifocais, tratamentos premium e exame de vista. Parcele em 12x sem juros ou 10% no PIX.",
  keywords: [
    "ótica zona leste sp",
    "óculos de grau são paulo",
    "lentes multifocais zona leste",
    "ótica jardim guaiaca",
    "ótica perto do oratório",
    "armações de óculos sp",
    "exame de vista zona leste",
    "ótica são paulo parcela",
  ],
  openGraph: {
    title: "Óticas Vizz | Estilo e Visão na Zona Leste",
    description:
      "Curadoria premium de eyewear e tecnologia alemã em lentes. Visite-nos na Av. do Oratório, 4869.",
    url: "https://www.oticasvizz.com.br",
    siteName: "Óticas Vizz",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Óticas Vizz – Zona Leste SP",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.oticasvizz.com.br" },
  icons: {
    icon: [{ url: "/images/logo.webp", type: "image/webp" }],
    shortcut: "/images/logo.webp",
    apple: "/images/logo.webp",
  },
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
        <a href="#main-content" className="skip-link">
          Saltar para o conteúdo
        </a>
        <SchemaOrg />
        {children}
        <DynamicChat />
      </body>
    </html>
  );
}
