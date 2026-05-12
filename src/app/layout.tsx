import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM · Nucleo Garbatella",
  description: "Sistema gestionale interno del Nucleo Garbatella di Gioventù Nazionale.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
