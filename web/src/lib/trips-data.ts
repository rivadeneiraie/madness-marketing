import { type TripLevel, type DifficultyLevel } from "@/components/TripCard";

export interface TripDate {
    date: string;
    spots: number | "completo";
}

export interface ItineraryDay {
    day: number;
    title: string;
    summary: string;
    detail: string;
}

export interface TripTestimonial {
    initials: string;
    name: string;
    text: string;
    avatarColor: string;
}

export interface Trip {
    slug: string;
    name: string;
    location: string;
    region: string;
    altitude: string;
    altitudeValue: string;
    days: number;
    maxPersons: number;
    level: TripLevel;
    difficulty: DifficultyLevel;
    imageSrc: string;       // hero / card image (first of images[])
    images: string[];        // gallery photos
    description: string[];
    includes: string[];
    notIncludes: string[];
    itinerary: ItineraryDay[];
    dates: TripDate[];
    testimonials: TripTestimonial[];
}

export const TRIPS: Trip[] = [
    {
        slug: "cordon-del-plata-iniciacion",
        name: "Cordón del Plata",
        location: "Mendoza",
        region: "Andes Centrales",
        altitude: "4.000 msnm",
        altitudeValue: "4.000",
        days: 3,
        maxPersons: 6,
        level: "Principiante",
        difficulty: 2,
        imageSrc: "/photos/cordondelplata.jpg",
        images: [
            "/photos/cordondelplata01.jpg",
            "/photos/cordondelplata02.jpg",
            "/photos/cordondelplata03.jpg",
            "/photos/cordondelplata.jpg",
        ],
        description: [
            "Una expedición diseñada para personas que quieren hacer su primera experiencia en alta montaña. Subimos el Cordón del Plata con ritmo accesible, preparación previa con Pablo y grupos de máximo 6 personas — para que nadie quede atrás y nadie sienta que frena al grupo.",
            "No necesitás experiencia técnica. Sí necesitás ganas y una condición física básica que trabajamos juntos antes de salir.",
        ],
        includes: [
            "Acompañamiento de Pablo durante toda la expedición",
            "Seguro de accidentes y rescate en montaña (PAX Assistance)",
            "Orientación completa sobre el viaje y el equipamiento necesario",
            "Campamento base equipado (domo, sleeping, colchoneta)",
            "Alimentación completa en la montaña",
            "Equipamiento técnico prestado (bastones, crampones si hace falta)",
        ],
        notIncludes: [
            "Traslado desde tu ciudad a Mendoza",
            "Alojamiento en la ciudad la noche anterior",
        ],
        itinerary: [
            {
                day: 1,
                title: "Día 1 — Llegada y campamento base",
                summary: "Partida temprana · ~5 hs de marcha",
                detail: "Salida desde Mendoza. Trekking de ascenso con paradas técnicas para hidratación y aclimatación. Llegada al campamento base. Arme del campamento, almuerzo y descanso. Tarde libre para adaptarse a la altitud. Cena grupal y briefing del día 2.",
            },
            {
                day: 2,
                title: "Día 2 — Ascenso a los cerros",
                summary: "Salida temprana · Cumbre ~10am",
                detail: "Salida temprana hacia las cumbres. Ascenso final evaluando condiciones. Llegada a los picos más altos de la zona (Arenales 3650m, Lomas Blancas 3900m, Estudiantes 4000m según condiciones del grupo). Foto en cumbre, celebración y descenso al campamento.",
            },
            {
                day: 3,
                title: "Día 3 — Descenso y regreso",
                summary: "Regreso a Mendoza",
                detail: "Levantamiento del campamento. Descenso completo hasta el punto de partida. Regreso a Mendoza. Llegada estimada al mediodía.",
            },
        ],
        dates: [
            { date: "23–25 de mayo 2026", spots: 4 },
            { date: "20–22 de junio 2026", spots: 6 },
            { date: "18–20 de julio 2026", spots: "completo" },
        ],
        testimonials: [
            {
                initials: "M",
                name: "María G.",
                text: "Nunca había hecho senderismo de verdad. Pablo fue súper paciente y nos preparó de a poco. La montaña me cambió. Ya estoy planeando el próximo viaje.",
                avatarColor: "#1a3a5c",
            },
        ],
    },
    {
        slug: "cerro-punta-negra",
        name: "Cerro Punta Negra",
        location: "Cordón del Portillo",
        region: "Andes Centrales",
        altitude: "4.350 msnm",
        altitudeValue: "4.350",
        days: 3,
        maxPersons: 6,
        level: "Intermedio",
        difficulty: 3,
        imageSrc: "/photos/puntanegra.jpeg",
        images: [
            "/photos/puntanegra.jpeg",
            "/photos/cordondelplata02.jpg",
            "/photos/cordondelplata03.jpg",
            "/photos/05.jpg",
        ],
        description: [
            "Un ascenso técnico de nivel intermedio en el Cordón del Portillo, ideal para quienes ya tienen alguna experiencia en montaña y quieren dar un paso más en altura y exigencia.",
            "Se requiere condición física sólida y haber hecho alguna experiencia previa en montaña. El equipo evalúa cada caso antes de confirmar la inscripción.",
        ],
        includes: [
            "Acompañamiento de Pablo durante toda la expedición",
            "Seguro de accidentes y rescate en montaña (PAX Assistance)",
            "Orientación completa sobre el viaje y el equipamiento necesario",
            "Campamento base equipado",
            "Alimentación completa en la montaña",
            "Equipamiento técnico prestado",
        ],
        notIncludes: [
            "Traslado desde tu ciudad a Mendoza",
            "Alojamiento en la ciudad la noche anterior",
        ],
        itinerary: [
            {
                day: 1,
                title: "Día 1 — Aproximación y campamento",
                summary: "Partida temprana · ~6 hs de marcha",
                detail: "Salida desde Mendoza. Aproximación al Cordón del Portillo. Trekking de ascenso con paradas técnicas. Armado de campamento base y briefing técnico.",
            },
            {
                day: 2,
                title: "Día 2 — Cumbre Punta Negra",
                summary: "Salida 5am · Cumbre ~10am",
                detail: "Salida antes del amanecer. Ascenso técnico hacia los 4.350 msnm. Evaluación de condiciones en tiempo real. Cumbre y descenso al campamento. Tarde de descanso.",
            },
            {
                day: 3,
                title: "Día 3 — Descenso y regreso",
                summary: "Regreso a Mendoza",
                detail: "Levantamiento del campamento. Descenso completo y regreso a Mendoza.",
            },
        ],
        dates: [
            { date: "23–25 de mayo 2026", spots: 3 },
            { date: "4–6 de julio 2026", spots: 5 },
        ],
        testimonials: [
            {
                initials: "R",
                name: "Rodrigo A.",
                text: "La organización es impecable. Equipamiento revisado, seguros en orden, y Pablo respondía todos los mensajes. Saben lo que hacen.",
                avatarColor: "#1a3a5c",
            },
        ],
    },
    {
        slug: "bolivia-cordillera-real",
        name: "Bolivia — Cordillera Real",
        location: "La Paz, Bolivia",
        region: "Internacional",
        altitude: "5.000+ msnm",
        altitudeValue: "5.000+",
        days: 13,
        maxPersons: 6,
        level: "Avanzado",
        difficulty: 5,
        imageSrc: "/photos/bolivia.jpg",
        images: [
            "/photos/bolivia.jpg",
            "/photos/28.jpg",
            "/photos/03.jpg",
            "/photos/05.jpg",
        ],
        description: [
            "Una expedición de alta montaña por la Cordillera Real boliviana, con 4 cumbres en 13 días. La zona de La Paz ofrece algunas de las montañas más accesibles por sobre los 5.000 metros del continente.",
            "Se requiere experiencia previa en alta montaña y excelente condición física. El equipo evalúa cada candidato antes de confirmar la inscripción.",
        ],
        includes: [
            "Acompañamiento de Pablo y equipo durante toda la expedición",
            "Seguro de accidentes y rescate en montaña (PAX Assistance)",
            "Logística completa en Bolivia (traslados internos, permisos, campamentos)",
            "Alimentación completa durante la expedición",
            "Equipamiento técnico (piolet, crampones, cuerda)",
            "Orientación y briefing previo completo",
        ],
        notIncludes: [
            "Pasaje aéreo internacional a La Paz",
            "Alojamiento en La Paz antes y después de la expedición",
            "Seguro de viaje internacional",
        ],
        itinerary: [
            {
                day: 1,
                title: "Días 1–2 — Llegada y aclimatación en La Paz",
                summary: "La Paz · 3.650 msnm",
                detail: "Llegada a La Paz. Aclimatación progresiva en la ciudad. Reunión de equipo, revisión de material y briefing completo de la expedición.",
            },
            {
                day: 2,
                title: "Días 3–5 — Primera cumbre",
                summary: "Huayna Potosí · 6.088 msnm",
                detail: "Aproximación al campo base de Huayna Potosí. Aclimatación en campo alto y ascenso a la cumbre principal.",
            },
            {
                day: 3,
                title: "Días 6–10 — Cumbres centrales",
                summary: "Chearoco y Chachacomani",
                detail: "Travesía por la Cordillera Real con ascenso a Chearoco (6.127m) y Chachacomani (6.044m). Campamentos en altura, condiciones técnicas variables.",
            },
            {
                day: 4,
                title: "Días 11–13 — Cumbre final y regreso",
                summary: "Tuni Condoriri · Regreso a La Paz",
                detail: "Ascenso al macizo Tuni Condoriri. Descenso completo y regreso a La Paz. Celebración de cierre y vuelta.",
            },
        ],
        dates: [
            { date: "18–30 de julio 2026", spots: 4 },
            { date: "1–13 de agosto 2026", spots: 6 },
        ],
        testimonials: [
            {
                initials: "L",
                name: "Luciana P.",
                text: "Tenía mucho miedo de no dar el nivel. Pablo me dijo 'preparate bien y listo'. Lloré arriba. No me lo olvido más.",
                avatarColor: "#E63030",
            },
        ],
    },
];

export function getTripBySlug(slug: string): Trip | undefined {
    return TRIPS.find((t) => t.slug === slug);
}
