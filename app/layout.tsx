import "./globals.css";
import type { Metadata } from "next";
import FloatingMenu from "@/components/FloatingMenu";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://colegiocenit.com.mx"),
  title: {
    default: "Colegio Educativo Cenit | Tehuacán, Puebla",
    template: "%s | Colegio Cenit",
  },
  description:
    "Colegio Educativo Cenit — Formación integral, excelencia académica y valores humanos. Educación que inspira a alcanzar el punto más alto del conocimiento.",
  keywords: [
    "Colegio",
    "Escuela",
    "Tehuacán",
    "Educación",
    "Cenit",
    "Primaria",
    "Secundaria",
    "Kinder",
    "Puebla",
  ],
  authors: [{ name: "Colegio Educativo Cenit" }],
  creator: "Colegio Educativo Cenit",
  publisher: "Colegio Educativo Cenit",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Colegio Educativo Cenit",
    description:
      "Alcanzando el punto más alto del conocimiento y la formación humana.",
    url: "https://colegiocenit.com.mx",
    siteName: "Colegio Educativo Cenit",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Colegio Educativo Cenit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@colegiocenit",
    title: "Colegio Educativo Cenit",
    description:
      "Formación integral, excelencia académica y valores humanos en Tehuacán, Puebla.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://colegiocenit.com.mx",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className="antialiased bg-white text-gray-800 relative"
        style={{
          // Variables globales institucionales
          ["--color-primary" as any]: "#0f2b63",
          ["--color-accent" as any]: "#facc15",
          ["--color-bg" as any]: "#ffffff",
        }}
      >
        {/* Barra de navegación fija */}
        <header>
          <FloatingMenu />
        </header>

        {/* Contenido principal */}
        <main id="inicio">{children}</main>

        {/* Pie institucional */}
        <footer>
          <SiteFooter />
        </footer>

        {/* Scripts futuros, analytics o animaciones globales */}
      </body>
    </html>
  );
}
