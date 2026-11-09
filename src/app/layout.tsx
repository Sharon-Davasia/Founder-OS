import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FOUNDER/OS — The Complete Startup Playbook",
  description:
    "Every card in the startup game. A field manual from ideation to funding — chapters, checklists, pitch anatomy, funding mechanics and pitch-worthy startup ideas.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="grain">
      <body
        className={`${fraunces.variable} ${grotesk.variable} ${plexMono.variable} bg-ink text-paper antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
