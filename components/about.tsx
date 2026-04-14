"use client"

import { motion } from "framer-motion"
import {
  Database,
  Factory,
  Truck,
  Brain,
  Box,
  Smartphone,
} from "lucide-react"

const areas = [
  { icon: Database, label: "ERP / Sankhya", description: "Integrações profundas" },
  { icon: Factory, label: "PCP / Produção", description: "Planejamento e programação" },
  { icon: Truck, label: "WMS / Logística", description: "Controle de estoque" },
  { icon: Brain, label: "IA Aplicada", description: "LLMs em ambiente corporativo" },
  { icon: Box, label: "AR / 3D", description: "WebXR e visualizadores" },
  { icon: Smartphone, label: "Mobile / IoT", description: "Apps e sensores" },
]

export function About() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Sobre
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">
            Estudante de Engenharia de Software no SENAI FATESG, com foco em ferramentas
            industriais reais — não exercícios acadêmicos. Especialista em integração
            com ERP Sankhya, automação de produção, WMS e aplicação de LLMs em ambiente
            corporativo.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            Meus projetos conectam dados, automatizam processos e geram valor real
            para o negócio, indo do chão de fábrica até dashboards executivos.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {areas.map((area, index) => (
              <motion.div
                key={area.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
              >
                <area.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">{area.label}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
