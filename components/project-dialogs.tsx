"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, AlertTriangle, ChevronLeft, ChevronRight, Check } from "lucide-react"
import type { Project } from "@/lib/projects"

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="space-y-3">
      <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted">
        <img
          src={images[current]}
          alt={`${name} - Screenshot ${current + 1}`}
          className="w-full h-full object-contain bg-black/5"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrent((p) => (p + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-16 h-10 rounded border overflow-hidden transition-all ${
                i === current
                  ? "border-primary ring-1 ring-primary"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface ProjectDetailsDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  if (!project) return null

  const hasImages = project.images && project.images.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] sm:max-w-[80vw] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 pt-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <DialogTitle className="text-2xl">{project.name}</DialogTitle>
              <div className="flex flex-wrap gap-1.5">
                {project.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            <DialogDescription className="text-base">
              {project.tagline}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className={`px-6 pb-6 ${hasImages ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : ""}`}>
          {/* Left: Images */}
          {hasImages && (
            <div className="min-w-0">
              <ImageCarousel images={project.images!} name={project.name} />
            </div>
          )}

          {/* Right: Content */}
          <div className="space-y-6 min-w-0">
            {/* Description */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">Descrição</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">Funcionalidades</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stack */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Ver no GitHub
                </a>
              </Button>
              {project.deploy && (
                <Button variant="outline" asChild>
                  <a
                    href={project.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir site
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ProjectPreviewDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectPreviewDialog({
  project,
  open,
  onOpenChange,
}: ProjectPreviewDialogProps) {
  if (!project || !project.deploy) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 pb-2 border-b border-border">
          <DialogTitle className="text-lg">{project.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Conteúdo carregado de site externo
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 bg-background p-2">
          <iframe
            src={project.deploy}
            title={`Preview de ${project.name}`}
            className="w-full h-full rounded-lg border border-border bg-background"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-4 pt-2 border-t border-border flex justify-end gap-2">
          <Button variant="outline" asChild>
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir em nova aba
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
