"use client"

import { motion } from "framer-motion"
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiKotlin,
  SiGo,
  SiNextdotjs,
  SiReact,
  SiFastapi,
  SiFlask,
  SiStreamlit,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSqlite,
  SiRedis,
  SiDocker,
  SiVercel,
  SiNginx,
} from "react-icons/si"
import { Database, Coffee } from "lucide-react"

const techCategories = [
  {
    title: "Linguagens",
    items: [
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: Coffee },
      { name: "Kotlin", icon: SiKotlin },
      { name: "Go", icon: SiGo },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Flask", icon: SiFlask },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "Express", icon: SiExpress },
    ],
  },
  {
    title: "Bancos de Dados",
    items: [
      { name: "Oracle", icon: Database },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQLite", icon: SiSqlite },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Infra & DevOps",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Vercel", icon: SiVercel },
      { name: "Nginx", icon: SiNginx },
    ],
  },
]

const aiTools = [
  "Claude (Anthropic)",
  "Gemini (Google)",
  "OpenAI",
  "DeepSeek",
  "Mistral",
]

const industrialTools = ["Sankhya ERP", "WebXR", "A-Frame", "Evolution API"]

export function TechStack() {
  return (
    <section id="stack" className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Stack & Ferramentas
          </h2>
          <p className="text-muted-foreground text-lg">
            Tecnologias que utilizo no dia a dia
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Tech Categories with Icons */}
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.items.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
                  >
                    <tech.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-foreground">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* AI Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              IA / LLMs
            </h3>
            <div className="flex flex-wrap gap-3">
              {aiTools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Industrial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Industrial / Especializado
            </h3>
            <div className="flex flex-wrap gap-3">
              {industrialTools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-sm font-medium text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
