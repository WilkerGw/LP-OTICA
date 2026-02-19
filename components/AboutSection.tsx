"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
    return (
        <section className="bg-white section-padding overflow-hidden relative" id="sobre">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48 -mt-48" />

            <Container>
                <div className="grid lg:grid-cols-2 gap-5 lg:gap-20 items-center">
                    {/* Left Column: Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Lifestyle Premium
                        </div>
                        <div className="relative rounded-3xl overflow-hidden aspect-4/3">


                            <Image
                                src="/images/logo.webp"
                                alt="Lifestyle Premium Oticas Vizz"
                                fill
                                className="object-contain p-10"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-premium hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
                                    3+
                                </div>
                                <div className="text-xs font-bold text-primary uppercase tracking-tighter text-left">
                                    Anos de<br />Experiência
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-4 text-left">

                            <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                                Mais que uma ótica, <br />
                                <span className="text-secondary">um estilo de vida.</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                Trazemos o que há de mais moderno em tecnologia óptica e design, garantindo que você enxergue o mundo com clareza e elegância. Nossa missão é unir saúde visual com as tendências mundiais de eyewear.
                            </p>
                        </div>

                        {/* Feature List */}
                        <div className="grid sm:grid-cols-2 gap-6 pt-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                </div>
                                <div className="text-sm font-bold text-primary">Tecnologia Digital</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                </div>
                                <div className="text-sm font-bold text-primary">Curadoria Premium</div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-6">
                            <Button asChild size="lg" className="shadow-lg shadow-secondary/20 rounded-2xl w-full">
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
