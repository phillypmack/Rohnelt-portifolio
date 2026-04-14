export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rohnelt. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Goiás, Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
