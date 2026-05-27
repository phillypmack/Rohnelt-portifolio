"use client";

import { motion } from "framer-motion";
import { Lock, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { secretProjects } from "@/lib/secret-projects";

export function SecretProjects() {
  return (
    <section id="projetos" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground inline-flex items-center gap-3">
            <Terminal className="w-8 h-8 text-primary" />
            Criações secretas
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            O que não está no portfólio público.
          </p>
        </motion.div>

        {secretProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-8 rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm text-center font-mono"
          >
            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-foreground/80">
              <span className="text-primary">$</span> ls -la ~/secret
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              total 0 — vazio por enquanto
            </p>
            <p className="text-muted-foreground/60 text-xs mt-6">
              Adicione projetos editando{" "}
              <code className="text-primary">lib/secret-projects.ts</code>
            </p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {secretProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-xl bg-card/50 border border-primary/20 backdrop-blur-sm hover:border-primary/60 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  {project.status && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-primary/40 text-primary uppercase"
                    >
                      {project.status}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.tagline}
                </p>
                {project.description && (
                  <p className="text-muted-foreground/80 text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>
                )}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[11px] bg-transparent border-primary/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
