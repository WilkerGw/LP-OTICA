"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
    return (
        <section className="section-padding overflow-hidden relative" id="sobre">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48 -mt-48" />

            <Container>
                <div className="grid gap-5 lg:gap-12 items-center">
                    {/* Left Column: Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >

                        {/* Mobile Badge (Above Logo) */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest md:hidden mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Lifestyle Premium
                        </div>

                        <div className="relative w-fit mx-auto">
                            {/* Desktop/Tablet Badge (Overlay) */}
                            <div className="absolute -top-7 -left-7 z-20 hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Lifestyle Premium
                            </div>

                            <div className="relative w-[250px] md:w-[300px] rounded-3xl overflow-hidden aspect-4/3">
                                <Image
                                    src="/images/logo.webp"
                                    alt="Lifestyle Premium Oticas Vizz"
                                    fill
                                    className="object-contain pt-5 md:pt-0"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-4 -right-15 md:-bottom-6 md:-right-6 glass-card p-1 md:p-2 rounded-2xl shadow-premium flex">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm md:text-base">
                                        3+
                                    </div>
                                    <div className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-tighter text-left">
                                        Anos de<br />Experiência
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Text Content */}
                    <div className="space-y-6">
                        <div className="space-y-4 text-center">
                            <h2 className="text-lg text-muted-foreground leading-relaxed font-medium">
                                Mais que uma ótica,um estilo de vida.
                            </h2>
                        </div>

                        {/* CTA */}
                        <div className="flex pt-4">
                            <Button asChild size="lg" className="shadow-lg shadow-secondary/20 rounded-2xl w-full lg:w-auto lg:mx-auto">
                                <a href="https://wa.me/551123628799?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Solicite seu Orçamento
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
