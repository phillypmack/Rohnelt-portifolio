"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Brain,
  Warehouse,
  CalendarClock,
  Factory,
  BarChart3,
  ShoppingCart,
  Key,
  Bot,
  TrendingUp,
  Leaf,
  Flower2,
  Sticker,
  Package,
  Box,
  Boxes,
  BellRing,
  Cog,
  MapPin,
  LayoutDashboard,
  FolderSync,
  Swords,
  Truck,
  Container,
  PackageCheck,
  ScanEye,
  Store,
  ScanBarcode,
  Users,
  PieChart,
  FileSearch,
  MailWarning,
  Banknote,
  ShoppingBag,
  ClipboardList,
  Trophy,
  Tag,
  Terminal,
  Car,
  GraduationCap,
  Gamepad2,
  BookOpen,
  Github,
  ExternalLink,
  Eye,
} from "lucide-react"
import type { Project } from "@/lib/projects"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  activity: Activity,
  brain: Brain,
  warehouse: Warehouse,
  "calendar-clock": CalendarClock,
  factory: Factory,
  "bar-chart-3": BarChart3,
  "shopping-cart": ShoppingCart,
  key: Key,
  bot: Bot,
  "trending-up": TrendingUp,
  leaf: Leaf,
  "flower-2": Flower2,
  sticker: Sticker,
  package: Package,
  box: Box,
  cube: Boxes,
  "bell-ring": BellRing,
  cog: Cog,
  "map-pin": MapPin,
  "layout-dashboard": LayoutDashboard,
  "folder-sync": FolderSync,
  swords: Swords,
  truck: Truck,
  container: Container,
  "package-check": PackageCheck,
  "scan-eye": ScanEye,
  store: Store,
  "scan-barcode": ScanBarcode,
  users: Users,
  "pie-chart": PieChart,
  "file-search": FileSearch,
  "mail-warning": MailWarning,
  banknote: Banknote,
  "shopping-bag": ShoppingBag,
  "clipboard-list": ClipboardList,
  trophy: Trophy,
  tag: Tag,
  terminal: Terminal,
  car: Car,
  "graduation-cap": GraduationCap,
  "gamepad-2": Gamepad2,
  "book-open": BookOpen,
}

interface ProjectCardProps {
  project: Project
  index: number
  onViewDetails: (project: Project) => void
  onViewPreview: (project: Project) => void
}

export function ProjectCard({
  project,
  index,
  onViewDetails,
  onViewPreview,
}: ProjectCardProps) {
  const Icon = iconMap[project.icon] || Box

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {project.name}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.badges.slice(0, 2).map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 bg-secondary/50"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {project.tagline}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-[11px] bg-transparent"
            >
              {tech}
            </Badge>
          ))}
          {project.stack.length > 4 && (
            <Badge variant="outline" className="text-[11px] bg-transparent">
              +{project.stack.length - 4}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onViewDetails(project)}
          >
            <Eye className="w-3 h-3 mr-1" />
            Detalhes
          </Button>
          {project.deploy && (
            <Button
              variant="default"
              size="sm"
              className="text-xs"
              onClick={() => onViewPreview(project)}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Preview
            </Button>
          )}
          {project.github && (
            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${project.name} no GitHub`}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
