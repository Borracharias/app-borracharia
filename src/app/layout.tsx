import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Borracharia App",
  description: "Sistema de gerenciamento de borracharia",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Borracharia App",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#0F2A44",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
