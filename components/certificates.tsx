"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { certificates } from "@/lib/certificates"

export function Certificates() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (certificates.length === 0) return null

  return (
    <section id="certificados" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Certificados
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                {cert.image && (
                  <div
                    className="aspect-[4/3] bg-muted cursor-pointer overflow-hidden"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {cert.date}
                    </Badge>
                    {cert.credentialUrl && (
                      <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Verificar
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && certificates[selectedIndex]?.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {certificates.length}
            </div>

            <img
              src={certificates[selectedIndex].image}
              alt={certificates[selectedIndex].title}
              className="max-w-[95vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {certificates.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex((p) => (p! - 1 + certificates.length) % certificates.length)
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex((p) => (p! + 1) % certificates.length)
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Info bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-medium">{certificates[selectedIndex].title}</p>
              <p className="text-white/60 text-sm">{certificates[selectedIndex].issuer} - {certificates[selectedIndex].date}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
