export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-primary)] text-white">
      {/* 🌈 Fondo institucional animado sutil */}
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(250,204,21,0.08),rgba(59,130,246,0.08),rgba(250,204,21,0.08))] animate-[spin_slow_60s_linear_infinite] opacity-20 pointer-events-none" />

      {/* 🧱 Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* 🏫 Bloque institucional */}
        <div>
          <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-3">
            Colegio Educativo Cenit
          </h3>
          <p className="text-sm text-blue-100 leading-relaxed max-w-xs mx-auto md:mx-0">
            Alcanzando el punto más alto del conocimiento y la formación humana.
          </p>
        </div>

        {/* 🔗 Enlaces útiles */}
        <div>
          <h4 className="font-semibold text-[var(--color-accent)] mb-4 text-lg">
            Enlaces útiles
          </h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>
              <a href="#nosotros" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#valores" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                Valores
              </a>
            </li>
            <li>
              <a href="#docentes" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                Docentes
              </a>
            </li>
            <li>
              <a href="#eventos" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                Eventos
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* 📞 Contacto */}
        <div>
          <h4 className="font-semibold text-[var(--color-accent)] mb-4 text-lg">
            Contacto
          </h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>Tehuacán, Puebla, México</li>
            <li>contacto@colegiocenit.edu.mx</li>
            <li>+52 (238) 123 4567</li>
          </ul>
        </div>
      </div>

      {/* 🔸 Línea divisoria + derechos */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-xs text-blue-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>
            © {new Date().getFullYear()} Colegio Educativo Cenit — Todos los derechos reservados.
          </span>
          <span>
            Desarrollado por{" "}
            <a
              href="https://mhegasdev.com.mx"
              target="_blank"
              className="text-[var(--color-accent)] hover:underline font-medium"
            >
              MhegasDev
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
