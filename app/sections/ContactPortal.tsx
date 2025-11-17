"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPortal() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contacto"
      className="relative py-20 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden"
    >
      {/* Fondo institucional */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 dark:text-white mb-3">
            Contáctanos
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Nuestro equipo estará encantado de atenderte. Comunícate por el medio que prefieras.
          </p>
        </motion.div>

        {/* 🎯 GRID de tres columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {/* 1️⃣ Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 p-6 h-full"
          >
            <div className="space-y-6 flex-1">
              <InfoItem
                icon={<MapPin className="w-6 h-6 text-[var(--color-accent)]" />}
                title="Dirección"
                text="Calle 9 Sur #1204, Col. Centro, Tehuacán, Puebla, México"
              />
              <InfoItem
                icon={<Phone className="w-6 h-6 text-[var(--color-accent)]" />}
                title="Teléfono"
                text="+52 (238) 123 4567"
              />
              <InfoItem
                icon={<Mail className="w-6 h-6 text-[var(--color-accent)]" />}
                title="Correo electrónico"
                text="contacto@colegiocenit.edu.mx"
              />
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="https://wa.me/523812345678"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-medium px-5 py-3 rounded-xl transition"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a
                href="tel:+523812345678"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-3 rounded-xl transition"
              >
                <Phone className="w-5 h-5" /> Llamar
              </a>
            </div>
          </motion.div>

          {/* 2️⃣ Columna central — Formulario */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between h-full"
          >
            <div className="space-y-5 flex-1">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Nombre completo" type="text" required />
                <Input label="Correo electrónico" type="email" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition resize-none"
                />
              </div>
            </div>

            <div className="pt-6 text-center">
              <button
                type="submit"
                disabled={sent}
                className={`inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-xl text-white w-full transition-all ${
                  sent
                    ? "bg-green-500 cursor-default"
                    : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]"
                }`}
              >
                {sent ? "✅ Mensaje enviado" : <><Send className="w-5 h-5" /> Enviar mensaje</>}
              </button>
            </div>
          </motion.form>

          {/* 3️⃣ Columna derecha — Mapa */}
          <motion.a
            href="https://maps.app.goo.gl/yAusX791Vd6RVfAn9"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block overflow-hidden rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 group h-full"
          >
            <div className="relative w-full h-full">
              <img
                src="./img/mapa-tehuacan.png"
                alt="Ubicación del Colegio Educativo Cenit en Tehuacán"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-4 left-4 bg-white/90 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm shadow-sm">
                📍 Colegio Cenit
              </div>
            </div>
          </motion.a>
        </div>

      </div>
    </section>
  );
}

/* --- Subcomponentes --- */
function InfoItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4">
      {icon}
      <div>
        <h3 className="font-semibold text-lg text-blue-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function Input({ label, type, required }: { label: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        required={required}
        type={type}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
      />
    </div>
  );
}
