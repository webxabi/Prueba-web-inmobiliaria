import type { Metadata } from "next";
import "./globals.css";
import { initDb } from "@/lib/db";

// Initialize the database on server start
initDb();

export const metadata: Metadata = {
  title: "Premium Real Estate | Encuentra tu próximo hogar",
  description: "Inmobiliaria especializada en venta de pisos exclusivos con asesoramiento personalizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
