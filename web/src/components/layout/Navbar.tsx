"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { waLink } from "@/lib/config";

const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Viajes", href: "/viajes" },
    { label: "Próximas salidas", href: "/proximas-salidas" },
    { label: "El equipo", href: "/equipo" },
    { label: "Cómo trabajamos", href: "/como-trabajamos" },
    { label: "Grandes Expediciones", href: "/grandes-expediciones" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav
            className="sticky top-0 z-50 border-b"
            style={{
                background: "rgba(13,27,42,0.97)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(255,255,255,0.07)",
            }}
        >
            {/* ── Desktop layout ── */}
            <div className="max-w-7xl mx-auto px-8 hidden xl:flex items-center h-16">
                {/* Logo — flex-1 ancla a la izquierda */}
                <div className="flex-1 min-w-0">
                    <Link href="/" className="flex items-center gap-3 w-fit">
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                            <Image
                                src="/logo-v4.png"
                                alt="Madness Expeditions"
                                width={80}
                                height={80}
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="leading-tight">
                            <div className="font-black text-sm uppercase tracking-wider text-white">
                                The Madness Expeditions
                            </div>
                            <div className="text-xs uppercase tracking-widest opacity-50 text-white">
                                Argentina
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Links — flex-1 centrados */}
                <div className="flex-1 min-w-0 flex items-center justify-center gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative text-sm font-medium transition-colors hover:text-white whitespace-nowrap after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-mx-red after:transition-all after:duration-300 hover:after:w-full"
                            style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA WhatsApp — flex-1 ancla a la derecha */}
                <div className="flex-1 min-w-0 flex justify-end">
                    <a
                        href={waLink("navbar")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                    >
                        <WhatsAppIcon size={16} />
                        Consultar por WhatsApp
                    </a>
                </div>
            </div>

            {/* ── Mobile layout ── */}
            <div className="flex xl:hidden items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                        <Image
                            src="/logo-v4.png"
                            alt="Madness Expeditions"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                    <div className="leading-tight">
                        <div className="text-white font-black tracking-wider text-xs uppercase">
                            The Madness
                        </div>
                        <div className="text-white font-light tracking-widest text-xs uppercase opacity-80">
                            Expeditions
                        </div>
                    </div>
                </Link>

                {/* Acciones derecha */}
                <div className="flex items-center gap-3">
                    <a
                        href={waLink("navbar")}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Consultar por WhatsApp"
                    >
                        <WhatsAppIcon size={20} color="#4ade80" />
                    </a>
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="flex flex-col gap-1.5 p-1"
                        aria-label="Menú"
                        aria-expanded={menuOpen}
                    >
                        <span className="block w-5 h-0.5 bg-white" />
                        <span className="block w-5 h-0.5 bg-white" />
                        <span className="block w-5 h-0.5 bg-white" />
                    </button>
                </div>
            </div>

            {/* ── Mobile menu desplegable ── */}
            {menuOpen && (
                <div
                    className="xl:hidden px-4 pb-4 flex flex-col gap-1 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-2.5 px-3 text-sm font-medium rounded-lg transition-colors hover:bg-white/5"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

function WhatsAppIcon({
    size = 24,
    color = "white",
}: {
    size?: number;
    color?: string;
}) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.097 1.508 5.817L.057 23.886l6.219-1.427A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.029 21.818a9.946 9.946 0 01-5.064-1.379l-.363-.215-3.763.863.943-3.653-.237-.375A9.932 9.932 0 012.09 12c0-5.478 4.461-9.939 9.939-9.939 5.478 0 9.939 4.461 9.939 9.939 0 5.478-4.461 9.818-9.939 9.818z" />
        </svg>
    );
}
