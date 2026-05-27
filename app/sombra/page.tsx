import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { SecretProjects } from "@/components/secret-projects";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Tlenhor",
  description: "",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function Sombra() {
  return (
    <main className="theme-red min-h-screen bg-background relative">
      <Navigation />
      <Hero displayName="Tlenhor" />
      <SecretProjects />
      <Footer />
    </main>
  );
}
