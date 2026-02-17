"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/container";
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
        color: "bg-primary",
        position: "top-0 h-1/3",
    },
    {
        id: "intermediate",
        label: "Visão Intermediária",
        shortLabel: "Intermediária",
        description: "Perfeita para computador, conversas e painel do carro.",
        icon: Monitor,
        color: "bg-gray-400",
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
        <section className="py-8 bg-white">
            <Container>
                <div className="mb-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-primary mb-4">
                        Entenda as Lentes Multifocais
                    </h2>
                </div>

                {/* Horizontal Buttons - matching ProductLines pattern */}
                <div className="flex flex-wrap justify-center gap-4 mb-4 z-20 relative">
                    {zones.map((zone) => (
                        <button
                            key={zone.id}
                            onClick={() => setActiveZone(zone.id)}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 border font-medium text-sm shadow-sm cursor-pointer",
                                activeZone === zone.id
                                    ? "bg-secondary/15 border-secondary/30 text-primary shadow-md transform scale-105"
                                    : "bg-muted border-transparent text-muted-foreground hover:bg-secondary/10 hover:border-secondary/20"
                            )}
                        >
                            <zone.icon className="w-4 h-4" />
                            {zone.shortLabel}
                        </button>
                    ))}
                </div>

                {/* Main Content Area - Image + Info Panel */}
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Lens Image with zone overlay */}
                    <div className="lg:col-span-8 relative min-h-[200px] lg:min-h-[350px] flex items-center justify-center">
                        <div className="relative w-full max-w-md mx-auto">
                            <Image
                                src="/images/evolution.webp"
                                alt="Lente Multifocal"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-auto opacity-90"
                            />

                            {/* Zone overlay masked to lens shape */}
                            <div
                                className="absolute inset-0 z-10"
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
                                        animate={{ opacity: activeZone === zone.id ? 0.5 : 0.08 }}
                                    >
                                        {zone.id !== 'near' && (
                                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/40 w-full" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Hover zones for interaction */}
                            <div className="absolute inset-0 z-20 flex flex-col">
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
                    </div>

                    {/* Info Panel - matching ProductLines style */}
                    <div className="lg:col-span-4 flex items-center justify-center lg:justify-start">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedZone.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border backdrop-blur-sm w-full max-w-sm"
                            >
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-primary mb-3">
                                        {selectedZone.label}
                                    </h3>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                    {selectedZone.description}
                                </p>

                                {/* Zone indicator */}
                                <div className="space-y-3 pt-4 border-t border-border">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Zona da Lente</span>
                                    {zones.map((z) => (
                                        <div key={z.id} className="flex items-center gap-3">
                                            <span className="text-[10px] font-semibold text-primary w-20 shrink-0">{z.shortLabel}</span>
                                            <div className="flex-1 h-1.5 bg-muted rounded-full relative overflow-hidden">
                                                <motion.div
                                                    className={cn(
                                                        "absolute inset-y-0 left-0 rounded-full",
                                                        z.id === activeZone ? "bg-secondary" : "bg-primary/20"
                                                    )}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: z.id === activeZone ? "100%" : "30%" }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                />
                                            </div>
                                            <div
                                                className={cn(
                                                    "w-2 h-2 rounded-full shrink-0 shadow-sm transition-colors",
                                                    z.id === activeZone ? "bg-secondary" : "bg-primary/20"
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
}
