"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eye, Monitor, BookOpen } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Zone {
    id: string;
    label: string;
    shortLabel: string;
    description: string;
    icon: React.ElementType;
    color: string;
    position: string;
}

const zones: Zone[] = [
    {
        id: "far",
        label: "Visão de Longe",
        shortLabel: "Longe",
        description: "Ideal para dirigir, assistir TV e apreciar paisagens.",
        icon: Eye,
        color: "bg-secondary",
        position: "top-0 h-1/3",
    },
    {
        id: "intermediate",
        label: "Visão Intermediária",
        shortLabel: "Intermediária",
        description: "Perfeita para computador, conversas e painel do carro.",
        icon: Monitor,
        color: "bg-secondary",
        position: "top-1/3 h-1/3",
    },
    {
        id: "near",
        label: "Visão de Perto",
        shortLabel: "Perto",
        description: "Essencial para leitura, uso de celular e detalhes.",
        icon: BookOpen,
        color: "bg-secondary",
        position: "bottom-0 h-1/3",
    },
];

export function LensDiagram() {
    const [activeZone, setActiveZone] = useState<string>("far");

    const selectedZone = zones.find(z => z.id === activeZone) || zones[0];

    return (
        <section className="section-padding bg-white relative overflow-hidden" id="entenda-multifocais">
            {/* Background enhancement */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 -ml-36 opacity-50" />

            <Container>
                <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Guia de Tecnologia
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
                        Entenda o Poder das <br />
                        <span className="text-secondary">Lentes Multifocais</span>
                    </h2>
                </div>

                {/* Main Content Area - Layout matches AboutSection style */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Lens Image with zone overlay */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Unified Segmented Control */}
                        <div className="flex justify-center mb-8 lg:absolute lg:-top-6 lg:left-1/2 lg:-translate-x-1/2 lg:z-30 w-full lg:w-max px-4 lg:px-0">
                            <div className="relative flex items-center p-1.5 bg-white/50 backdrop-blur-md rounded-full border border-primary/5 shadow-2xl shadow-primary/5">
                                {/* Sliding Background Highlight */}
                                <div className="absolute inset-y-1.5 left-1.5 right-1.5 flex pointer-events-none">
                                    <motion.div
                                        className="h-full bg-secondary rounded-full shadow-lg shadow-secondary/20"
                                        animate={{
                                            width: `${100 / zones.length}%`,
                                            x: `${(zones.indexOf(selectedZone)) * 100}%`
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                </div>

                                {zones.map((zone) => (
                                    <button
                                        key={zone.id}
                                        onClick={() => setActiveZone(zone.id)}
                                        className={cn(
                                            "relative z-10 flex items-center justify-center gap-2.5 px-6 py-2 rounded-full transition-colors duration-200 font-bold text-[11px] uppercase tracking-wider min-w-[120px]",
                                            activeZone === zone.id
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-primary"
                                        )}
                                    >
                                        <zone.icon className={cn(
                                            "w-3.5 h-3.5 transition-transform duration-300",
                                            activeZone === zone.id && "scale-110"
                                        )} />
                                        {zone.shortLabel}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center p-8 rounded-3xl overflow-hidden ">
                            <Image
                                src="/images/evolution.webp"
                                alt="Lente Multifocal"
                                width={600}
                                height={600}
                                className="w-full h-auto opacity-90 object-contain drop-shadow-2xl"
                            />

                            {/* Zone overlay masked to lens shape */}
                            <div
                                className="absolute inset-x-8 inset-y-8 z-10"
                                style={{
                                    maskImage: "url('/images/evolution.webp')",
                                    maskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskImage: "url('/images/evolution.webp')",
                                    WebkitMaskSize: "contain",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center"
                                }}
                            >
                                {zones.map((zone) => (
                                    <motion.div
                                        key={zone.id}
                                        className={`absolute left-0 right-0 w-full ${zone.position} ${zone.color} transition-opacity duration-300`}
                                        animate={{ opacity: activeZone === zone.id ? 0.4 : 0.05 }}
                                    >
                                        {zone.id !== 'near' && (
                                            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 w-full" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Hover zones for interaction */}
                            <div className="absolute inset-x-8 inset-y-8 z-20 flex flex-col">
                                {zones.map((zone) => (
                                    <div
                                        key={zone.id}
                                        className="flex-1 w-full cursor-pointer"
                                        onClick={() => setActiveZone(zone.id)}
                                        onMouseEnter={() => setActiveZone(zone.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Info Panel */}
                    <div className="space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedZone.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                            <selectedZone.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-3xl font-extrabold text-primary">
                                            {selectedZone.label}
                                        </h3>
                                    </div>
                                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                        {selectedZone.description}
                                    </p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-border/50">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Visão Estratégica da Lente</span>
                                    {zones.map((z) => (
                                        <div key={z.id} className="flex items-center gap-4">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider w-24 shrink-0 transition-colors",
                                                z.id === activeZone ? "text-secondary" : "text-muted-foreground"
                                            )}>{z.shortLabel}</span>
                                            <div className="flex-1 h-2 bg-muted rounded-full relative overflow-hidden">
                                                <motion.div
                                                    className={cn(
                                                        "absolute inset-y-0 left-0 rounded-full",
                                                        z.id === activeZone ? "bg-secondary shadow-[0_0_10px_rgba(250,202,1,0.5)]" : "bg-primary/10"
                                                    )}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: z.id === activeZone ? "100%" : "20%" }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                />
                                            </div>
                                            <div
                                                className={cn(
                                                    "w-2.5 h-2.5 rounded-full shrink-0 shadow-sm transition-all duration-300",
                                                    z.id === activeZone ? "bg-secondary scale-125" : "bg-primary/5"
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="pt-8">
                            <Button asChild size="lg" className="rounded-2xl w-full shadow-xl shadow-secondary/20">
                                <a href="https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20lentes%20multifocais." target="_blank" rel="noopener noreferrer">
                                    Conhecer Tecnologias
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
