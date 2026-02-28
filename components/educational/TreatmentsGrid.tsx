"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Treatment {
    id: string;
    name: string;
    shortLabel: string;
    description: string;
    image: string;
    benefits: string[];
    drawbacks: string[];
}

const treatments: Treatment[] = [
    {
        id: "antirreflexo",
        name: "Antirreflexo",
        shortLabel: "Antirreflexo",
        description: "Elimina reflexos e brilhos indesejados, proporcionando uma visão mais nítida e confortável em qualquer ambiente.",
        image: "/images/trat-antirreflexo.webp",
        benefits: ["Reduz reflexos de telas e luzes", "Melhora a nitidez visual", "Aparência estética superior"],
        drawbacks: ["Reflexos constantes nas lentes", "Visão ofuscada à noite", "Aparência com brilhos indesejados"],
    },
    {
        id: "blue",
        name: "Filtro de Luz Azul",
        shortLabel: "Luz Azul",
        description: "Protege contra a luz azul nociva emitida por telas digitais, reduzindo o cansaço visual ao longo do dia.",
        image: "/images/trat-blue.webp",
        benefits: ["Proteção contra luz HEV", "Reduz fadiga digital", "Melhora a qualidade do sono"],
        drawbacks: ["Cansaço visual acelerado", "Dificuldade para dormir", "Olhos secos e irritados"],
    },
    {
        id: "hidrofobico",
        name: "Hidrofóbico",
        shortLabel: "Hidrofóbico",
        description: "Repele água e umidade da superfície da lente, mantendo a visão clara em dias chuvosos ou ambientes úmidos.",
        image: "/images/trat-hidrofobico.webp",
        benefits: ["Repele gotas de água", "Facilita a limpeza", "Visão clara na chuva"],
        drawbacks: ["Gotas acumulam na lente", "Limpeza difícil e frequente", "Visão embaçada com umidade"],
    },
    {
        id: "antiestatico",
        name: "Anti-estático",
        shortLabel: "Anti-estático",
        description: "Evita o acúmulo de poeira e partículas na superfície da lente, mantendo-a limpa por mais tempo.",
        image: "/images/trat-antiestatico.webp",
        benefits: ["Repele partículas de poeira", "Lente sempre limpa", "Menor necessidade de limpeza"],
        drawbacks: ["Poeira acumula rapidamente", "Necessidade constante de limpar", "Visão prejudicada por partículas"],
    },
    {
        id: "antirrisco",
        name: "Anti-risco",
        shortLabel: "Anti-risco",
        description: "Camada protetora que aumenta significativamente a resistência da lente contra arranhões do uso diário.",
        image: "/images/trat-antirrisco.webp",
        benefits: ["Maior durabilidade", "Resistência a arranhões", "Proteção no dia a dia"],
        drawbacks: ["Arranhões com facilidade", "Troca frequente de lentes", "Custo elevado a longo prazo"],
    },
    {
        id: "protecaouv",
        name: "Proteção UV",
        shortLabel: "UV",
        description: "Bloqueia 100% dos raios UVA e UVB, protegendo seus olhos contra danos causados pela radiação ultravioleta.",
        image: "/images/trat-protecaouv.webp",
        benefits: ["Bloqueio 100% UVA/UVB", "Previne doenças oculares", "Proteção diária essencial"],
        drawbacks: ["Exposição direta aos raios UV", "Risco de catarata e pterígio", "Danos acumulativos na retina"],
    },
    {
        id: "fotosensivel",
        name: "Fotossensível",
        shortLabel: "Fotossensível",
        description: "Lentes que se adaptam automaticamente à luminosidade, escurecendo no sol e clareando em ambientes internos.",
        image: "/images/trat-fotosenssivel.webp",
        benefits: ["Adaptação automática à luz", "Conforto em qualquer ambiente", "Substituem óculos de sol"],
        drawbacks: ["Desconforto com mudanças de luz", "Necessidade de óculos de sol extra", "Ofuscamento em dias claros"],
    },
    {
        id: "oleofobico",
        name: "Oleofóbico",
        shortLabel: "Oleofóbico",
        description: "Repele gordura e marcas de dedo, mantendo a lente transparente e fácil de limpar.",
        image: "/images/trat-oleofobico.webp",
        benefits: ["Repele oleosidade", "Sem marcas de dedo", "Limpeza simplificada"],
        drawbacks: ["Marcas de dedo constantes", "Lente sempre engordurada", "Necessidade de produtos especiais"],
    },
    {
        id: "polarizado",
        name: "Polarização",
        shortLabel: "Polarizado",
        description: "Elimina reflexos intensos de superfícies como água, asfalto e neve, ideal para dirigir e atividades ao ar livre.",
        image: "/images/trat-polarizado.webp",
        benefits: ["Elimina ofuscamento", "Ideal para dirigir", "Cores mais vivas e definidas"],
        drawbacks: ["Ofuscamento ao dirigir", "Dificuldade com superfícies brilhantes", "Cores distorcidas pelo reflexo"],
    },
];

export function TreatmentsGrid() {
    const [selectedId, setSelectedId] = useState<string>("antirreflexo");

    const selected = treatments.find(t => t.id === selectedId) || treatments[0];

    return (
        <section className="section-padding bg-[#FAFAF9] relative overflow-hidden" id="tratamentos">
            {/* Background enhancement - localized to prevent overall tone shift on mobile */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30 sm:opacity-50" />

            <Container className="flex-1 flex flex-col">
                <div className="mb-8 text-center max-w-2xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Performance Ocular
                    </div>
                    <h2 className="text-4xl md:text-4xl font-extrabold tracking-tight text-primary leading-tight">
                        Tratamentos de Alta Performance
                    </h2>
                </div>

                {/* Horizontal Navigation Buttons */}
                <div role="tablist" aria-label="Navegação de tratamentos" className="flex flex-wrap justify-center gap-3 z-20 relative">
                    {treatments.map((item) => (
                        <button
                            key={item.id}
                            id={`treatment-tab-${item.id}`}
                            aria-controls={`treatment-panel-${item.id}`}
                            onClick={() => setSelectedId(item.id)}
                            className={cn(
                                "relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-xs uppercase tracking-wider focus-visible:outline-secondary",
                                selectedId === item.id
                                    ? "bg-secondary text-primary shadow-lg shadow-secondary/20 scale-105"
                                    : "glass-card text-primary/70 hover:bg-secondary/10 hover:text-primary"
                            )}
                            aria-label={`Ver detalhes do tratamento ${item.name}`}
                            aria-selected={selectedId === item.id}
                            role="tab"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedId(item.id);
                                }
                            }}
                        >
                            {item.shortLabel}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="-mt-8 sm:-mt-24 space-y-6"
                    >


                        {/* Glasses Image Content Container */}
                        <div className="relative flex flex-col -mx-6 sm:mx-0">
                            <div className="relative w-full max-w-7xl mx-auto aspect-4/3 sm:aspect-video lg:aspect-16/7 sm:overflow-visible">
                                <Image
                                    src={selected.image}
                                    alt={selected.name}
                                    fill
                                    className="object-contain z-10 scale-100 md:scale-50 origin-center"
                                    sizes="100vw"
                                    priority
                                />
                                {/* Label: Com Tratamento */}
                                <div className="absolute top-[20%] left-[5%] lg:left-[30%] z-20 flex flex-col items-center group">
                                    <span className="px-4 py-1.5 text-[10px] sm:text-xs font-bold text-amber-900 bg-amber-100/90 backdrop-blur-sm border border-amber-400 rounded-full shadow-lg shadow-amber-200/20 whitespace-nowrap uppercase tracking-widest transition-transform group-hover:scale-110">
                                        Com Tratamento
                                    </span>
                                    <div className="w-px h-10 bg-linear-to-b from-amber-400 to-transparent" />
                                </div>
                                {/* Label: Sem Tratamento */}
                                <div className="absolute top-[20%] right-[5%] lg:right-[30%] z-20 flex flex-col items-center group">
                                    <span className="px-4 py-1.5 text-[10px] sm:text-xs font-bold text-primary bg-white backdrop-blur-sm border border-gray-400 rounded-full shadow-lg shadow-gray-200/20 whitespace-nowrap uppercase tracking-widest transition-transform group-hover:scale-110">
                                        Sem Tratamento
                                    </span>
                                    <div className="w-px h-10 bg-linear-to-b from-gray-400 to-transparent" />
                                </div>
                            </div>

                            {/* Information Panels - Relative on mobile, Overlay on Desktop */}
                            <div className="-mt-12 sm:mt-0 sm:absolute sm:top-[45%] sm:-translate-y-1/2 inset-x-0 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start z-30 px-4 sm:px-6 pointer-events-auto sm:pointer-events-none">
                                {/* Benefits */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center sm:items-start gap-2 p-4 sm:p-6 rounded-3xl hover:bg-white/10 transition-colors sm:w-1/3"
                                >
                                    <h3 className="text-[10px] sm:text-xs font-black text-secondary-dark uppercase tracking-[0.2em] mb-1">Benefícios</h3>
                                    {selected.benefits.map((b, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[10px] sm:text-sm text-primary font-bold text-center sm:text-left">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                            {b}
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Spacer for the glasses in the middle on desktop */}
                                <div className="hidden sm:block sm:w-1/3" />

                                {/* Drawbacks */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col items-center sm:items-end gap-2 p-4 sm:p-6 rounded-3xl hover:bg-white/10 transition-colors sm:w-1/3"
                                >
                                    <h3 className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Malefícios</h3>
                                    {selected.drawbacks.map((d, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[10px] sm:text-sm text-primary font-bold text-center sm:text-right">
                                            {d}
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                            {/* CTA */}
                            <div className="text-center -mt-10 sm:-mt-24 z-40 relative">
                                <Button asChild size="lg" className="rounded-2xl w-full md:w-auto shadow-xl shadow-secondary/20">
                                    <a
                                        href={`https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20tratamento%20${encodeURIComponent(selected.name)}.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Consultar Tratamento Premium
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </section>
    );
}
