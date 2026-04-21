import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import CatalogoViajes from "@/components/views/CatalogoViajes";

export const metadata = {
    title: "Viajes — Madness Expeditions",
    description: "Catálogo completo de expediciones y ascensos guiados en Argentina. Todos los niveles, con guía incluido.",
};

export default function ViajesPage() {
    return (
        <>
            <Navbar />
            <main>
                <CatalogoViajes />
            </main>
            <Footer />
            <FloatingWhatsAppButton />
        </>
    );
}
