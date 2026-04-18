"use client";

import Link from "next/link";
import { useState } from "react";

const WA_BASE = "https://wa.me/54XXXXXXXXXX";
const WA_MSG_NAV = encodeURIComponent(
    "Hola Pablo, me interesa conocer más sobre sus expediciones"
);

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
            <div className="max-w-6xl mx-auto px-8 hidden lg:flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                    <LogoIcon />
                    <div className="leading-tight">
                        <div className="font-black text-sm uppercase tracking-wider text-white">
                            The Madness Expeditions
                        </div>
                        <div className="text-xs uppercase tracking-widest opacity-50 text-white">
                            Argentina
                        </div>
                    </div>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-7">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-white"
                            style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA WhatsApp */}
                <a
                    href={`${WA_BASE}?text=${WA_MSG_NAV}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors flex-shrink-0"
                >
                    <WhatsAppIcon size={16} />
                    Consultar por WhatsApp
                </a>
            </div>

            {/* ── Mobile layout ── */}
            <div className="flex lg:hidden items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                        <LogoIconSmall />
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
                        href={`${WA_BASE}?text=${WA_MSG_NAV}`}
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
                    className="lg:hidden px-4 pb-4 flex flex-col gap-1 border-t"
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

/* ── Íconos SVG inline ── */

function LogoIcon() {
    return (
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <svg viewBox="0 0 40 40" width="32" height="32">
                <circle cx="20" cy="20" r="19" fill="#0D1B2A" />
                <ellipse cx="20" cy="13" rx="3" ry="3.2" fill="white" />
                <path d="M17 16 Q14 20 13 28 L20 26 L27 28 Q26 20 23 16 Z" fill="white" />
                <path d="M13 28 L10 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M27 28 L30 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path
                    d="M13 22 L9 20 M27 22 L31 20"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

function LogoIconSmall() {
    return (
        <svg viewBox="0 0 40 40" width="30" height="30">
            <circle cx="20" cy="20" r="19" fill="#0D1B2A" />
            <ellipse cx="20" cy="13" rx="3" ry="3.2" fill="white" />
            <path d="M17 16 Q14 20 13 28 L20 26 L27 28 Q26 20 23 16 Z" fill="white" />
            <path d="M13 28 L10 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M27 28 L30 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path
                d="M13 22 L9 20 M27 22 L31 20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
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
