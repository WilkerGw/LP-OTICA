"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import Image from "next/image"; // Added import

interface Zone {
    id: string;
    label: string;
    description: string;
    color: string;
    position: string;
}

const zones: Zone[] = [
    {
        id: "far",
        label: "Visão de Longe",
        description: "Ideal para dirigir, assistir TV e apreciar paisagens.",
        color: "bg-primary",
        position: "top-0 h-1/3",
    },
    {
        id: "intermediate",
        label: "Visão Intermediária",
        description: "Perfeita para computador, conversas e painel do carro.",
        color: "bg-gray-400",
        position: "top-1/3 h-1/3",
    },
    {
        id: "near",
        label: "Visão de Perto",
        description: "Essencial para leitura, uso de celular e detalhes.",
        color: "bg-secondary",
        position: "bottom-0 h-1/3",
    },
];

export function LensDiagram() {
    const [activeZone, setActiveZone] = useState<string | null>(null);

    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                            Tecnologia Óptica
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            Entenda as Lentes Multifocais
                        </h2>
                        <p className="text-lg text-slate-600">
                            A solução completa para todas as distâncias. As lentes multifocais permitem uma visão nítida sem a necessidade de trocar de óculos, integrando graus para perto, intermediário e longe em uma única lente.
                        </p>

                        <div className="space-y-4">
                            {zones.map((zone) => (
                                <div
                                    key={zone.id}
                                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${activeZone === zone.id ? 'border-secondary bg-secondary/10' : 'border-border hover:border-gray-300'}`}
                                    onMouseEnter={() => setActiveZone(zone.id)}
                                    onMouseLeave={() => setActiveZone(null)}
                                >
                                    <h4 className="font-semibold text-primary flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${zone.id === 'far' ? 'bg-primary' : zone.id === 'intermediate' ? 'bg-gray-400' : 'bg-secondary'}`}></span>
                                        {zone.label}
                                    </h4>
                                    <p className="text-muted-foreground text-sm mt-1">{zone.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual Diagram */}
                    <div className="relative mx-auto w-full max-w-[400px]">
                        {/* Base Lens Look - Image with intrinsic aspect ratio */}
                        <Image
                            src="/images/evolution.webp"
                            alt="Lente Multifocal"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto opacity-90 transition-transform duration-700 hover:scale-105"
                        />

                        {/* Zones - Masked to the lens image */}
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
                                    className={`absolute left-0 right-0 w-full ${zone.position} ${zone.color} opacity-20 transition-opacity duration-300 flex items-center justify-center`}
                                    animate={{ opacity: activeZone === zone.id ? 0.6 : 0.1 }}
                                >
                                    {/* Separator Line for Far and Intermediate */}
                                    {zone.id !== 'near' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/40 w-full" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive overlay for hovers on the diagram itself */}
                        <div className="absolute inset-0 z-20 flex flex-col">
                            {zones.map((zone) => (
                                <div
                                    key={zone.id}
                                    className="flex-1 w-full cursor-pointer"
                                    onMouseEnter={() => setActiveZone(zone.id)}
                                    onMouseLeave={() => setActiveZone(null)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
