"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REFRACTIVE_INDICES } from "./params";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LensVisualizerProps {
    selectedIndex: number;
    setSelectedIndex: (value: number) => void;
}

const LensVisualizer: React.FC<LensVisualizerProps> = ({
    selectedIndex,
    setSelectedIndex,
}) => {
    // Find the current selected index object to get the image
    const selectedRefractiveIndex = REFRACTIVE_INDICES.find(i => i.value === selectedIndex) || REFRACTIVE_INDICES[0];

    // Helper to render info panel to avoid duplication
    const renderInfoPanel = (isMobile: boolean) => (
        <div className={isMobile
            ? "absolute bottom-4 left-4 right-4 p-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg z-20 flex flex-col items-start md:hidden"
            : "hidden md:flex flex-col justify-center space-y-6 p-8 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl relative z-20 w-[320px] text-left"
        }>
            <div className="w-full">
                <span className={isMobile
                    ? "text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5 block opacity-70"
                    : "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2"
                }>
                    Índice Selecionado
                </span>
                <div className={isMobile ? "flex items-baseline gap-2" : "block"}>
                    <h3 className={isMobile
                        ? "text-xl font-extrabold text-primary"
                        : "text-4xl font-extrabold text-primary leading-tight"
                    }>
                        {selectedRefractiveIndex.value.toFixed(2)}
                    </h3>
                    <p className={isMobile
                        ? "text-xs font-semibold text-foreground"
                        : "text-xl font-medium text-foreground mt-1"
                    }>
                        {selectedRefractiveIndex.material}
                    </p>
                </div>
            </div>

            <div className={isMobile ? "hidden" : "space-y-4 pt-4 border-t border-border"}>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block pb-2">
                    Características
                </span>
                <ul className="space-y-3">
                    {selectedRefractiveIndex.features.map((feature, idx) => (
                        <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 text-sm font-medium text-primary"
                        >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0 shadow-sm" />
                            {feature}
                        </motion.li>
                    ))}
                </ul>
            </div>
            {/* Mobile specific features text if needed */}
            {isMobile && (
                <p className="text-[10px] text-primary leading-tight mt-2 opacity-80 font-medium">
                    {selectedRefractiveIndex.features.slice(0, 2).join(" • ")}
                </p>
            )}
        </div>
    );

    // Helper to render buttons to avoid duplication
    const renderButtons = (isMobile: boolean) => (
        <div className={isMobile
            ? "absolute right-4 top-4 z-40 flex flex-col gap-4 md:hidden pointer-events-auto items-end"
            : "hidden md:flex flex-row gap-6 p-2" // Desktop container styles moved to parent wrapper
        }>
            {REFRACTIVE_INDICES.map((index) => {
                const isSelected = selectedIndex === index.value;
                return (
                    <Button
                        key={index.value}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => setSelectedIndex(index.value)}
                        className={`
                            relative overflow-hidden transition-all duration-300
                            ${isMobile
                                ? "h-12 w-auto min-w-[80px] px-4 shadow-lg border border-white/40 backdrop-blur-md"
                                : "h-16 px-8 rounded-xl shadow-lg border backdrop-blur-md"
                            }
                            ${isSelected
                                ? "bg-secondary hover:bg-secondary/90 border-secondary text-primary shadow-secondary/30"
                                : isMobile
                                    ? "bg-white/30 hover:bg-white/50 text-primary border-white/40"
                                    : "bg-white/60 hover:bg-white/80 border-white/50 text-primary"
                            }
                            ${!isMobile ? "rounded-2xl" : "rounded-full"}
                        `}
                    >
                        <div className="flex items-center justify-center gap-2 z-10 w-full">
                            {/* Star Icon - Only show on Mobile or if selected on Desktop for cleaner look? Keeping as is for consistency */}
                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 ${isSelected ? "border-secondary/50 bg-secondary/20" : "border-primary/20 bg-primary/5"}`}>
                                <span className={`text-[10px] ${isSelected ? "text-primary" : "text-muted-foreground"}`}>★</span>
                            </div>
                            <span className={`font-bold tracking-tight ${isMobile ? "text-sm" : "text-base"}`}>
                                {index.value.toFixed(2)}
                            </span>
                        </div>
                    </Button>
                );
            })}
        </div>
    );

    return (
        <div className="relative w-full max-w-7xl mx-auto aspect-3/4 md:aspect-auto md:h-[700px] bg-muted rounded-3xl shadow-2xl overflow-hidden">

            {/* Desktop Buttons Overlay - Top Left */}
            <div className="hidden md:absolute md:top-8 md:left-8 md:flex md:items-center md:gap-4 z-30">
                {renderButtons(false)}
            </div>

            {/* Desktop Info Panel Overlay - Left Center */}
            <div className="hidden md:absolute md:top-32 md:left-12 md:flex z-30">
                {renderInfoPanel(false)}
            </div>

            {/* Main Image Container */}
            <div className="relative w-full h-full bg-muted">
                {/* Mobile Buttons (Overlay inside Image container - Top Right) */}
                {renderButtons(true)}

                {/* Mobile Info Panel (Overlay inside Image container - Bottom) */}
                {renderInfoPanel(true)}

                {/* Single Image Component - Full Scale */}
                <Image
                    src={selectedRefractiveIndex.image}
                    alt={`Lente índice ${selectedRefractiveIndex.value} - ${selectedRefractiveIndex.material}`}
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100}
                />

                {/* Mobile Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent md:hidden pointer-events-none" />
            </div>
        </div>
    );
};

export default LensVisualizer;
