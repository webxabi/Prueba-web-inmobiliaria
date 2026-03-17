import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Nova Estates',
    default: 'Nova Estates | Encuentra tu próximo hogar',
  },
  description: "Inmobiliaria especializada en venta de pisos exclusivos con asesoramiento personalizado.",
  keywords: ["inmobiliaria", "pisos en venta", "comprar casa", "inmuebles exclusivos", "Nova Estates"],
  openGraph: {
    title: 'Nova Estates | Encuentra tu próximo hogar',
    description: 'Inmobiliaria especializada en venta de pisos exclusivos con asesoramiento personalizado.',
    url: 'https://www.novaestates.com',
    siteName: 'Nova Estates',
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
