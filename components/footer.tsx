import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rohnelt. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/segredos"
              className="text-sm text-muted-foreground/40 hover:text-primary font-mono transition-colors"
            >
              ./segredos<span className="animate-pulse">_</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Goiás, Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
