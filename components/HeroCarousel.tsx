"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Image from "next/image";

interface Slide {
    id: number;
    image: string;
    mobileImage?: string;
    title: string;
    price: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

const slides: Slide[] = [
    {
        id: 1,
        image: "/images/dois-oculos.webp",
        mobileImage: "/images/dois-oculos-mobile.webp",
        title: "Dois óculos de grau",
        price: "10x R$ 39,90",
        subtitle: "Aproveite esta oferta imperdível. Válido para dioptrias de até 2 graus.",
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20dois%20óculos.",
    },
    {
        id: 2,
        image: "/images/multifocal.png",
        mobileImage: "/images/multifocal-mobile.webp",
        title: "Óculos multifocal digital",
        price: "10x R$ 79,90",
        subtitle: "Tecnologia digital para uma visão perfeita em todas as distâncias.",
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20multifocal.",
    },
    {
        id: 3,
        image: "/images/filtro-azul.webp",
        mobileImage: "/images/filtro-azul-mobile.webp",
        title: "Monofocal com Filtro Azul",
        price: "10x R$ 24,90",
        subtitle: "Proteção contra telas digitais. Válido para dioptrias de até 2 graus.",
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20filtro%20azul.",
    },
    {
        id: 4,
        image: "/images/antirreflexo.webp",
        mobileImage: "/images/antirreflexo-mobile.webp",
        title: "Monofocal com Antirreflexo",
        price: "10x R$ 17,90",
        subtitle: "Elimine reflexos indesejados. Válido para dioptrias de até 2 graus.",
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20antirreflexo.",
    },
];

export function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds auto-play
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-dvh w-full overflow-hidden bg-primary text-white">
            {/* Top Bar Info */}
            <div className="absolute top-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-md border-b border-white/10 py-2 pt-[calc(env(safe-area-inset-top)+0.5rem)] text-xs md:text-sm">
                <Container>
                    <div className="flex flex-row justify-between items-center text-white/90 px-2 md:px-0">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                            <span className="font-medium tracking-wide">(11) 2345-6789</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                            <span className="font-medium tracking-wide">Av Do Oratório 4869</span>
                        </div>
                    </div>
                </Container>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Background Images - Mobile & Desktop */}
                    <div className="absolute inset-0 z-0">
                        {/* Mobile Image */}
                        <div className="relative h-full w-full md:hidden">
                            <Image
                                src={slides[current].mobileImage || slides[current].image}
                                alt={slides[current].title}
                                fill
                                priority
                                quality={95}
                                className="object-cover object-top"
                                sizes="100vw"
                            />
                        </div>
                        {/* Desktop Image */}
                        <div className="relative h-full w-full hidden md:block">
                            <Image
                                src={slides[current].image}
                                alt={slides[current].title}
                                fill
                                priority
                                quality={95}
                                className="object-cover object-center"
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent md:bg-gradient-to-r" />

                    {/* Content */}
                    <Container className="relative flex h-full items-end justify-center md:justify-start pb-15 md:pb-48">
                        <div className="max-w-3xl space-y-6 px-4 md:px-0 text-center md:text-left flex flex-col items-center md:items-start">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-white"
                            >
                                <span className="block text-3xl md:text-5xl font-bold leading-tight uppercase tracking-tight">
                                    {slides[current].title}
                                </span>
                                <span className="block text-secondary font-extrabold text-4xl md:text-7xl mt-2 tracking-tighter">
                                    {slides[current].price}
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="text-lg text-white/80 md:text-xl w-full"
                            >
                                {slides[current].subtitle}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="flex flex-row items-center justify-center md:justify-start w-full sm:w-auto"
                            >
                                <Button asChild size="lg" variant="secondary" className="px-12 rounded-2xl w-full md:w-auto shadow-lg shadow-secondary/20">
                                    <a href={slides[current].ctaLink} target="_blank" rel="noopener noreferrer">
                                        {slides[current].ctaText}
                                    </a>
                                </Button>
                            </motion.div>
                        </div>
                    </Container>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 md:bottom-32 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-3 rounded-full transition-all backdrop-blur-sm ${index === current ? "bg-secondary w-8" : "bg-white/30 hover:bg-white/50 w-3 border border-white/10"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 backdrop-blur-[2px] transition-all hover:bg-white/20 hover:text-white hover:border-white/30 md:left-8"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 backdrop-blur-[2px] transition-all hover:bg-white/20 hover:text-white hover:border-white/30 md:right-8"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            </button>
        </section>
    );
}
