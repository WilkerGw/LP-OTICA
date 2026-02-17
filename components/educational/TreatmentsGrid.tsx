"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
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
        <section className="bg-white py-8 relative overflow-hidden flex flex-col">
            <Container className="flex-1 flex flex-col">
                <div className="mb-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-primary mb-4">
                        Tratamentos Disponíveis
                    </h2>
                </div>

                {/* Horizontal Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-4 z-20 relative">
                    {treatments.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className={cn(
                                "relative flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 border font-medium text-sm shadow-sm cursor-pointer",
                                selectedId === item.id
                                    ? "bg-secondary/15 border-secondary/30 text-primary shadow-md transform scale-105"
                                    : "bg-muted border-transparent text-muted-foreground hover:bg-secondary/10 hover:border-secondary/20"
                            )}
                        >
                            {item.shortLabel}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Treatment Name + Description - above image */}
                        <div className="text-center mb-2">
                            <h3 className="text-xl font-bold text-secondary uppercase tracking-wide mb-1">
                                {selected.name}
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                                {selected.description}
                            </p>
                        </div>

                        {/* Glasses Image with lens labels and text below lenses */}
                        <div className="relative w-full max-w-4xl mx-auto aspect-[2/1]">
                            <Image
                                src={selected.image}
                                alt={selected.name}
                                fill
                                className="object-contain z-10"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                            {/* Label: Com Tratamento */}
                            <div className="absolute top-[15%] left-[15%] z-20 flex flex-col items-center">
                                <span className="px-3 py-1 text-[10px] sm:text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-300 rounded-full shadow-sm whitespace-nowrap">
                                    Com Tratamento
                                </span>
                                <div className="w-px h-4 bg-amber-300" />
                            </div>
                            {/* Label: Sem Tratamento */}
                            <div className="absolute top-[15%] right-[15%] z-20 flex flex-col items-center">
                                <span className="px-3 py-1 text-[10px] sm:text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-300 rounded-full shadow-sm whitespace-nowrap">
                                    Sem Tratamento
                                </span>
                                <div className="w-px h-4 bg-gray-300" />
                            </div>
                            {/* Benefits text below left lens */}
                            <div className="absolute bottom-[2%] left-[5%] z-20 w-[40%] flex flex-col items-center gap-1">
                                <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-wider">Benefícios</span>
                                {selected.benefits.map((b, i) => (
                                    <span key={i} className="text-[10px] sm:text-xs text-foreground/80 text-center leading-tight">• {b}</span>
                                ))}
                            </div>
                            {/* Drawbacks text below right lens */}
                            <div className="absolute bottom-[2%] right-[5%] z-20 w-[40%] flex flex-col items-center gap-1">
                                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Malefícios</span>
                                {selected.drawbacks.map((d, i) => (
                                    <span key={i} className="text-[10px] sm:text-xs text-muted-foreground text-center leading-tight">• {d}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <div className="text-center pt-8">
                    <p className="text-sm text-muted-foreground mb-4">Quer saber qual tratamento é ideal para você?</p>
                    <a
                        href={`https://wa.me/551123628799?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20tratamento%20${encodeURIComponent(selected.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-primary font-semibold rounded-2xl transition-all duration-300 ease-out shadow-sm shadow-secondary/20 hover:shadow-md hover:shadow-secondary/30 hover:brightness-105 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                    >
                        Consultar Tratamento
                    </a>
                </div>
            </Container>
        </section>
    );
}
