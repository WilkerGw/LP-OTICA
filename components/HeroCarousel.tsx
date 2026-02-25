"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Image from "next/image";

interface Slide {
    id: number;
    image: string;
    mobileImage?: string;
    title: string;
    price: string;
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
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20dois%20óculos.",
    },
    {
        id: 2,
        image: "/images/multifocal.webp",
        mobileImage: "/images/multifocal-mobile.webp",
        title: "Óculos multifocal digital",
        price: "10x R$ 79,90",
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20multifocal.",
    },
    {
        id: 3,
        image: "/images/filtro-azul.webp",
        mobileImage: "/images/filtro-azul-mobile.webp",
        title: "Monofocal com Filtro Azul",
        price: "10x R$ 24,90",
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20filtro%20azul.",
    },
    {
        id: 4,
        image: "/images/antirreflexo.webp",
        mobileImage: "/images/antirreflexo-mobile.webp",
        title: "Monofocal com Antirreflexo",
        price: "10x R$ 17,90",
        ctaText: "Aproveite",
        ctaLink: "https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20promoção%20de%20antirreflexo.",
    },
];

export function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-dvh w-full overflow-hidden bg-[#f0efed]">
            {/* Header Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 p-2 md:px-10 lg:px-16">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Image
                        src="/images/logo.webp"
                        alt="Ótica Vizz"
                        width={120}
                        height={40}
                        className="h-8 md:h-10 w-auto object-contain"
                        priority
                    />
                    {/* Contact Info */}
                    <div className="hidden md:flex flex-col items-end text-xs text-foreground/70 font-medium leading-relaxed">
                        <span>Av Do Oratório 4869</span>
                        <span>(11) 2362-8799</span>
                    </div>
                </div>
            </div>

            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Background Images */}
                    <div className="absolute inset-0 z-0">
                        {/* Mobile Image */}
                        <div className="relative h-full w-full md:hidden">
                            <Image
                                src={slides[current].mobileImage || slides[current].image}
                                alt={slides[current].title}
                                fill
                                priority={current === 0}
                                quality={85}
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
                                priority={current === 0}
                                quality={85}
                                className="object-cover object-center"
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* Desktop: left-to-right gradient */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#f0efed] from-5% via-[#f0efed]/30 via-25% to-transparent to-45%" />

                    {/* Mobile: top-to-bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f0efed] from-0% via-[#f0efed]/10 via-15% to-transparent to-30% md:hidden" />

                    {/* Content */}
                    <Container className="relative z-10 flex h-full items-start pt-20 md:items-center md:pt-16 justify-start pb-40 md:pb-32">
                        <div className="max-w-2xl space-y-6 px-2 md:px-0">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] uppercase tracking-tight text-foreground">
                                    {slides[current].title}
                                </span>
                                <span className="block mt-2">
                                    <span className="block text-foreground/60 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-widest">a partir de</span>
                                    <span className="block text-secondary font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter">
                                        {slides[current].price}
                                    </span>
                                </span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    variant="secondary"
                                    className="px-12 rounded-full shadow-lg shadow-secondary/20 text-base font-bold"
                                >
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
            <div className="absolute bottom-28 md:bottom-20 left-8 md:left-12 lg:left-20 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-3 rounded-full transition-all ${index === current
                            ? "bg-secondary w-8"
                            : "bg-foreground/20 hover:bg-foreground/40 w-3"
                            }`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
