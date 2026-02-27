"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronUp, ChevronDown, ArrowUp } from "lucide-react";

const SECTION_IDS = [
    "hero",
    "orcamento",
    "sobre",
    "entenda-multifocais",
    "produtos",
    "tratamentos",
    "simulador",
    "armacoes",
    "diferenciais",
    "depoimentos",
    "faq",
    "contato",
];

export function SectionNavigator() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLastSection, setIsLastSection] = useState(false);

    const detectCurrentSection = useCallback(() => {
        const scrollY = window.scrollY + window.innerHeight / 3;

        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
            const id = SECTION_IDS[i];
            let el: HTMLElement | null = null;

            if (id === "hero") {
                el = document.querySelector("main > div:first-child");
            } else {
                el = document.getElementById(id);
            }

            if (el && el.offsetTop <= scrollY) {
                setCurrentIndex(i);
                break;
            }
        }

        const atBottom =
            window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
        setIsLastSection(atBottom || currentIndex === SECTION_IDS.length - 1);
    }, [currentIndex]);

    useEffect(() => {
        detectCurrentSection();
        window.addEventListener("scroll", detectCurrentSection, { passive: true });
        return () => window.removeEventListener("scroll", detectCurrentSection);
    }, [detectCurrentSection]);

    const scrollToSection = (index: number) => {
        const id = SECTION_IDS[index];
        let el: HTMLElement | null = null;

        if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const goUp = () => {
        if (currentIndex > 0) {
            scrollToSection(currentIndex - 1);
        }
    };

    const goDown = () => {
        if (currentIndex < SECTION_IDS.length - 1) {
            scrollToSection(currentIndex + 1);
        }
    };

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Determine visible dot range (show 3 dots around current)
    const totalDots = 3;
    const half = Math.floor(totalDots / 2);
    let dotStart = Math.max(0, currentIndex - half);
    let dotEnd = Math.min(SECTION_IDS.length - 1, dotStart + totalDots - 1);
    if (dotEnd - dotStart < totalDots - 1) {
        dotStart = Math.max(0, dotEnd - totalDots + 1);
    }
    const visibleDots = SECTION_IDS.slice(dotStart, dotEnd + 1).map((_, i) => dotStart + i);

    return (
        <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5" aria-label="Navegação rápida entre seções">
            {/* Container pill */}
            <div className="flex flex-col items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-2 shadow-lg border border-gray-200/60">
                {/* Up arrow */}
                <button
                    onClick={goUp}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            goUp();
                        }
                    }}
                    disabled={currentIndex === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Seção anterior"
                >
                    <ChevronUp className="w-4 h-4" />
                </button>

                {/* Dots */}
                <div className="flex flex-col items-center gap-1 py-1">
                    {visibleDots.map((idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToSection(idx)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    scrollToSection(idx);
                                }
                            }}
                            className={`rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex
                                ? "w-2 h-4 bg-primary"
                                : "w-2 h-2 bg-gray-300 hover:bg-primary/40"
                                }`}
                            aria-label={`Ir para seção ${SECTION_IDS[idx]}`}
                        />
                    ))}
                </div>

                {/* Down arrow or Back to top */}
                {isLastSection ? (
                    <button
                        onClick={goToTop}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                goToTop();
                            }
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                        aria-label="Voltar ao topo"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={goDown}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                goDown();
                            }
                        }}
                        disabled={currentIndex === SECTION_IDS.length - 1}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Próxima seção"
                    >
                        <ChevronDown className="w-4 h-4" />
                    </button>
                )}
            </div>
        </nav>
    );
}
