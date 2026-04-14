"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, AlertTriangle } from "lucide-react"
import type { Project } from "@/lib/projects"

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.name}</DialogTitle>
          <DialogDescription className="text-base">
            {project.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Descrição</h4>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

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
