"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { REFRACTIVE_INDICES } from "../tools/LensComparator/params";

export function RefractionIndex() {
    const [selectedIndex, setSelectedIndex] = useState(1.50);

    const selected = REFRACTIVE_INDICES.find(i => i.value === selectedIndex) || REFRACTIVE_INDICES[0];

    return (
        <section className="section-padding bg-[#FAFAF9] relative overflow-hidden" id="simulador">
            {/* Ambient glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <Container>
                <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Simulador de Espessura
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
                        O Equilíbrio entre <br />
                        <span className="text-secondary">Estética e Precisão</span>
                    </h2>
                </div>

                {/* Premium Segmented Control Selector - Scrollable on mobile */}
                <div className="relative mb-12 z-20">
                    <div className="flex justify-center">
                        <div className="inline-flex p-1.5 glass-panel rounded-full shadow-inner max-w-full overflow-x-auto no-scrollbar scroll-smooth">
                            <div className="flex gap-1 shrink-0 px-2">
                                {REFRACTIVE_INDICES.map((index) => (
                                    <button
                                        key={index.value}
                                        onClick={() => setSelectedIndex(index.value)}
                                        className={cn(
                                            "px-5 sm:px-8 py-2.5 rounded-full transition-all duration-500 font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap shrink-0",
                                            selectedIndex === index.value
                                                ? "bg-secondary text-primary shadow-lg shadow-secondary/20 scale-105"
                                                : "text-muted-foreground hover:text-primary hover:bg-white/50"
                                        )}
                                    >
                                        {index.value.toFixed(2)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Layout matches AboutSection style */}
                {/* Main Content Area - Centered Vertical Stack */}
                <div className="relative flex flex-col items-center">

                    {/* Top: Lens Preview Container */}
                    <div className="relative w-full max-w-4xl aspect-video md:aspect-[21/9] overflow-hidden glass-panel group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.value}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="relative w-full h-full bg-transparent"
                            >
                                <Image
                                    src={selected.image}
                                    alt={`Lente índice ${selected.value} - ${selected.material}`}
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                                    priority
                                    quality={100}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Dimension indicator tag */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 glass-panel rounded-xl shadow-lg border border-white/50 backdrop-blur-xl">
                            <span className="text-sm sm:text-lg font-black text-secondary tracking-tighter">
                                Índice {selected.value.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Bottom: Info Panel */}
                    <div className="w-full max-w-4xl space-y-8 sm:space-y-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.value}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-8 sm:space-y-12 flex flex-col items-center text-center"
                            >
                                {/* Material & Features Wrapper */}
                                <div className="space-y-6 flex flex-col items-center">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">Material Premium</span>
                                        <h3 className="text-4xl sm:text-6xl font-black text-primary tracking-tight">
                                            {selected.material}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-1">
                                        {selected.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/5 shadow-sm">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                                                <span className="text-[9px] sm:text-[10px] font-black text-primary/80 uppercase tracking-widest leading-none pt-0.5">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Performance Attributes */}
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-2 rounded-[40px]">
                                    <div className="space-y-8 text-left">
                                        {/* attribute 1 */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest">Estética</span>
                                                    <span className="block text-sm font-bold text-primary">Nível de Espessura</span>
                                                </div>
                                                <span className="text-[10px] font-black text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                                                    {selected.value >= 1.67 ? "ULTRA FINA" : "ESTRUTURADA"}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-primary/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-linear-to-r from-secondary to-amber-300"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, ((selected.value - 1.49) / (1.74 - 1.49)) * 100)}%` }}
                                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                                />
                                            </div>
                                        </div>

                                        {/* attribute 2 */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest">Conforto</span>
                                                    <span className="block text-sm font-bold text-primary">Leveza da Lente</span>
                                                </div>
                                                <span className="text-[10px] font-black text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                                                    {selected.value >= 1.59 ? "ALTA LEVEZA" : "PADRÃO"}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-primary/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-linear-to-r from-secondary to-amber-300"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, ((selected.value - 1.49) / (1.74 - 1.49)) * 80 + 20)}%` }}
                                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional context or visual in second col might go here if needed, but for now sticking to 2-columns for attributes if many, or 1-col for center stack */}
                                    <div className="flex items-center justify-center p-4">
                                        <p className="text-sm font-medium text-primary/60 italic">
                                            {selected.value >= 1.67
                                                ? "Recomendado para altos graus (acima de 4.00), reduzindo drasticamente o efeito de 'fundo de garrafa'."
                                                : "Ideal para graus baixos a moderados, oferecendo resistência e excelente nitidez visual."}
                                        </p>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex justify-center">
                                    <Button asChild size="lg" className="rounded-2xl shadow-2xl shadow-secondary/30 transition-transform w-full px-10 py-7 text-lg uppercase font-black">
                                        <a
                                            href={`https://wa.me/551123628799?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20lente%20índice%20${selected.value.toFixed(2)}%20(${encodeURIComponent(selected.material)}).`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Consultar Disponibilidade
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
}
