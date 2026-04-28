import { type TripLevel, type DifficultyLevel } from "@/components/ui/TripCard";
import { client } from "@/sanity/lib/client";
import { ALL_TRIPS_QUERY, TRIP_BY_SLUG_QUERY } from "@/sanity/lib/queries";

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
    imageSrc: string;
    images: string[];
    description: string[];
    includes: string[];
    notIncludes: string[];
    itinerary: ItineraryDay[];
    dates: TripDate[];
    testimonials: TripTestimonial[];
    cardNote?: string;
}

function normalizeSpots(spots: string | number | undefined): number | "completo" {
    if (spots === "completo") return "completo";
    if (typeof spots === "number") return spots;
    const parsed = parseInt(String(spots), 10);
    return isNaN(parsed) ? 0 : parsed;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeTrip(raw: any): Trip {
    return {
        ...raw,
        dates: (raw.dates ?? []).map((d: { date: string; spots: string | number }) => ({
            date: d.date,
            spots: normalizeSpots(d.spots),
        })),
    } as Trip;
}

export async function getAllTrips(): Promise<Trip[]> {
    const raw = await client.fetch(ALL_TRIPS_QUERY, {}, { next: { revalidate: 3600 } });
    return (raw ?? []).map(normalizeTrip);
}

export async function getTripBySlug(slug: string): Promise<Trip | undefined> {
    const raw = await client.fetch(TRIP_BY_SLUG_QUERY, { slug }, { next: { revalidate: 3600 } });
    if (!raw) return undefined;
    return normalizeTrip(raw);
}
