"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { projects, categories, type Category, type Project } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"
import {
  ProjectDetailsDialog,
  ProjectPreviewDialog,
} from "@/components/project-dialogs"

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [detailsProject, setDetailsProject] = useState<Project | null>(null)
  const [previewProject, setPreviewProject] = useState<Project | null>(null)

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory))

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Projetos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ferramentas reais desenvolvidas para ambiente industrial e produtos SaaS
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="text-sm"
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onViewDetails={setDetailsProject}
              onViewPreview={setPreviewProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum projeto encontrado nesta categoria.
          </p>
        )}
      </div>

      {/* Dialogs */}
      <ProjectDetailsDialog
        project={detailsProject}
        open={!!detailsProject}
        onOpenChange={(open) => !open && setDetailsProject(null)}
      />
      <ProjectPreviewDialog
        project={previewProject}
        open={!!previewProject}
        onOpenChange={(open) => !open && setPreviewProject(null)}
      />
    </section>
  )
}
