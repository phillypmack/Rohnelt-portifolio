import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { SecretProjects } from "@/components/secret-projects";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "ЯОНПЗЛТ",
  description: "",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const SECRET_ROLES = [
  "Engenheiro Reverso",
  "Caçador de Vulnerabilidades",
  "Operador de Sombras",
  "Pentester",
  "Arquiteto de Payloads",
  "Red Team Operator",
  "Analista Forense",
  "Engenheiro do Caos",
];

const SECRET_DESCRIPTION =
  "Ferramentas que não vão pro GitHub público. Sistemas que ninguém sabe que existem. O que rodam aqui dentro fica aqui dentro.";

const SECRET_BADGES = [
  "C2",
  "OSINT",
  "Reverse",
  "Bash",
  "Python",
  "Recon",
  "0day",
];

export default function Sombra() {
  return (
    <main className="theme-red min-h-screen bg-background relative">
      <Navigation />
      <Hero
        displayName="ЯОНПЗЛТ"
        scrambleCharset="АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯЁ0123456789@#$%&*<>{}[]/?"
        typewriterWords={SECRET_ROLES}
        description={SECRET_DESCRIPTION}
        techBadges={SECRET_BADGES}
      />
      <SecretProjects />
      <Footer />
    </main>
  );
}
