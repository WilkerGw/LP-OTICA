"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { REFRACTIVE_INDICES } from "../tools/LensComparator/params";

export function RefractionIndex() {
    const [selectedIndex, setSelectedIndex] = useState(1.50);

    const selected = REFRACTIVE_INDICES.find(i => i.value === selectedIndex) || REFRACTIVE_INDICES[0];

    return (
        <section className="py-8 bg-muted" id="simulador">
            <Container>
                <div className="mb-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-primary mb-4">
                        Índice de Refração
                    </h2>
                </div>

                {/* Horizontal Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-4 z-20 relative">
                    {REFRACTIVE_INDICES.map((index) => (
                        <button
                            key={index.value}
                            onClick={() => setSelectedIndex(index.value)}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 border font-medium text-sm shadow-sm cursor-pointer",
                                selectedIndex === index.value
                                    ? "bg-secondary/15 border-secondary/30 text-primary shadow-md transform scale-105"
                                    : "bg-white border-transparent text-muted-foreground hover:bg-secondary/10 hover:border-secondary/20"
                            )}
                        >
                            <span className="font-bold">{index.value.toFixed(2)}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Lens Image */}
                    <div className="lg:col-span-8 relative min-h-[250px] lg:min-h-[400px] flex items-center justify-center rounded-2xl overflow-hidden bg-white">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.value}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="relative w-full h-full min-h-[250px] lg:min-h-[400px]"
                            >
                                <Image
                                    src={selected.image}
                                    alt={`Lente índice ${selected.value} - ${selected.material}`}
                                    fill
                                    className="object-cover object-center"
                                    priority
                                    quality={90}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Info Panel */}
                    <div className="lg:col-span-4 flex items-center justify-center lg:justify-start">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.value}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border backdrop-blur-sm w-full max-w-sm"
                            >
                                <div className="mb-4">
                                    <h3 className="text-4xl font-extrabold text-primary mb-1">
                                        {selected.value.toFixed(2)}
                                    </h3>
                                    <p className="text-base font-medium text-foreground">
                                        {selected.material}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {selected.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                                            </div>
                                            <span className="text-xs font-medium text-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Thickness indicator */}
                                <div className="space-y-3 pt-4 border-t border-border">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Espessura Relativa</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-semibold text-primary w-16 shrink-0">Fina</span>
                                        <div className="flex-1 h-1.5 bg-muted rounded-full relative overflow-hidden">
                                            <motion.div
                                                className="absolute inset-y-0 left-0 bg-secondary rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${Math.min(100, ((selected.value - 1.49) / (1.74 - 1.49)) * 100)}%`
                                                }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                            />
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-secondary shrink-0 shadow-sm" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-semibold text-primary w-16 shrink-0">Leve</span>
                                        <div className="flex-1 h-1.5 bg-muted rounded-full relative overflow-hidden">
                                            <motion.div
                                                className="absolute inset-y-0 left-0 bg-secondary rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${Math.min(100, ((selected.value - 1.49) / (1.74 - 1.49)) * 90 + 10)}%`
                                                }}
                                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                            />
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-secondary shrink-0 shadow-sm" />
                                    </div>
                                </div>

                                {/* CTA */}
                                <a
                                    href={`https://wa.me/551123628799?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20lente%20índice%20${selected.value.toFixed(2)}%20(${encodeURIComponent(selected.material)}).`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary font-semibold rounded-2xl transition-all duration-300 ease-out shadow-sm shadow-secondary/20 hover:shadow-md hover:shadow-secondary/30 hover:brightness-105 hover:scale-[1.03] active:scale-[0.97] cursor-pointer text-sm"
                                >
                                    Solicitar Orçamento
                                </a>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
}
