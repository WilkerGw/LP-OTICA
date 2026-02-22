"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Glasses, SlidersHorizontal, MessageCircle, X } from "lucide-react";

interface Armacao {
    id: number;
    nome: string;
    marca: string;
    genero: string;
    formato: string;
    preco: string;
    cor: string;
}

const armacoes: Armacao[] = [
    { id: 1, nome: "Redondo Clássico", marca: "Vizz Collection", genero: "Feminino", formato: "Redondo", preco: "R$ 149,90", cor: "#1a1a2e" },
    { id: 2, nome: "Aviador Retrô", marca: "Vizz Collection", genero: "Masculino", formato: "Aviador", preco: "R$ 169,90", cor: "#6b7280" },
    { id: 3, nome: "Cat-Eye Elegance", marca: "Vizz Premium", genero: "Feminino", formato: "Cat-Eye", preco: "R$ 199,90", cor: "#92400e" },
    { id: 4, nome: "Square Urban", marca: "Vizz Premium", genero: "Masculino", formato: "Quadrado", preco: "R$ 179,90", cor: "#0f172a" },
    { id: 5, nome: "Oval Kids", marca: "Vizz Kids", genero: "Infantil", formato: "Oval", preco: "R$ 99,90", cor: "#2563eb" },
    { id: 6, nome: "Redondo Bold", marca: "Vizz Bold", genero: "Masculino", formato: "Redondo", preco: "R$ 189,90", cor: "#44403c" },
    { id: 7, nome: "Aviador Dourado", marca: "Vizz Premium", genero: "Feminino", formato: "Aviador", preco: "R$ 219,90", cor: "#b8860b" },
    { id: 8, nome: "Square Kids", marca: "Vizz Kids", genero: "Infantil", formato: "Quadrado", preco: "R$ 109,90", cor: "#dc2626" },
];

const generos = ["Todos", "Feminino", "Masculino", "Infantil"];
const formatos = ["Todos", "Redondo", "Quadrado", "Aviador", "Cat-Eye", "Oval"];

function GlassesIcon({ cor, formato }: { cor: string; formato: string }) {
    const getPath = () => {
        switch (formato) {
            case "Redondo":
                return (
                    <>
                        <circle cx="70" cy="80" r="35" fill="none" stroke={cor} strokeWidth="3" />
                        <circle cx="170" cy="80" r="35" fill="none" stroke={cor} strokeWidth="3" />
                        <path d="M105 80 Q120 70 135 80" fill="none" stroke={cor} strokeWidth="3" />
                        <line x1="35" y1="75" x2="10" y2="65" stroke={cor} strokeWidth="2.5" />
                        <line x1="205" y1="75" x2="230" y2="65" stroke={cor} strokeWidth="2.5" />
                    </>
                );
            case "Aviador":
                return (
                    <>
                        <path d="M35 65 Q50 45 90 50 Q110 52 105 80 Q100 105 70 105 Q40 105 35 65Z" fill="none" stroke={cor} strokeWidth="3" />
                        <path d="M135 80 Q130 52 150 50 Q190 45 205 65 Q210 105 170 105 Q140 105 135 80Z" fill="none" stroke={cor} strokeWidth="3" />
                        <path d="M105 75 Q120 68 135 75" fill="none" stroke={cor} strokeWidth="3" />
                        <line x1="35" y1="65" x2="10" y2="58" stroke={cor} strokeWidth="2.5" />
                        <line x1="205" y1="65" x2="230" y2="58" stroke={cor} strokeWidth="2.5" />
                    </>
                );
            case "Cat-Eye":
                return (
                    <>
                        <path d="M35 85 Q30 55 55 48 Q85 42 100 55 Q108 65 105 85 Q100 105 65 105 Q35 105 35 85Z" fill="none" stroke={cor} strokeWidth="3" />
                        <path d="M135 85 Q132 65 140 55 Q155 42 185 48 Q210 55 205 85 Q205 105 175 105 Q140 105 135 85Z" fill="none" stroke={cor} strokeWidth="3" />
                        <path d="M105 78 Q120 72 135 78" fill="none" stroke={cor} strokeWidth="3" />
                        <line x1="35" y1="70" x2="10" y2="55" stroke={cor} strokeWidth="2.5" />
                        <line x1="205" y1="70" x2="230" y2="55" stroke={cor} strokeWidth="2.5" />
                    </>
                );
            case "Oval":
                return (
                    <>
                        <ellipse cx="70" cy="80" rx="38" ry="28" fill="none" stroke={cor} strokeWidth="3" />
                        <ellipse cx="170" cy="80" rx="38" ry="28" fill="none" stroke={cor} strokeWidth="3" />
                        <path d="M108 78 Q120 72 132 78" fill="none" stroke={cor} strokeWidth="3" />
                        <line x1="32" y1="73" x2="10" y2="65" stroke={cor} strokeWidth="2.5" />
                        <line x1="208" y1="73" x2="230" y2="65" stroke={cor} strokeWidth="2.5" />
                    </>
                );
            default: // Quadrado
                return (
                    <>
                        <rect x="35" y="52" width="70" height="56" rx="8" fill="none" stroke={cor} strokeWidth="3" />
                        <rect x="135" y="52" width="70" height="56" rx="8" fill="none" stroke={cor} strokeWidth="3" />
                        <path d="M105 78 Q120 72 135 78" fill="none" stroke={cor} strokeWidth="3" />
                        <line x1="35" y1="70" x2="10" y2="62" stroke={cor} strokeWidth="2.5" />
                        <line x1="205" y1="70" x2="230" y2="62" stroke={cor} strokeWidth="2.5" />
                    </>
                );
        }
    };

    return (
        <svg viewBox="0 0 240 160" className="w-full h-full" aria-hidden="true">
            <defs>
                <radialGradient id={`bg-${formato}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={cor} stopOpacity="0.06" />
                    <stop offset="100%" stopColor={cor} stopOpacity="0.02" />
                </radialGradient>
            </defs>
            <rect width="240" height="160" fill={`url(#bg-${formato})`} />
            {getPath()}
        </svg>
    );
}

function FilterPill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${active
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
        >
            {label}
        </button>
    );
}

export function FramesSection() {
    const [filtroGenero, setFiltroGenero] = useState("Todos");
    const [filtroFormato, setFiltroFormato] = useState("Todos");

    const produtosFiltrados = armacoes.filter((p) => {
        const matchGenero = filtroGenero === "Todos" || p.genero === filtroGenero;
        const matchFormato = filtroFormato === "Todos" || p.formato === filtroFormato;
        return matchGenero && matchFormato;
    });

    const activeFilters = (filtroGenero !== "Todos" ? 1 : 0) + (filtroFormato !== "Todos" ? 1 : 0);

    return (
        <section className="hidden section-padding bg-muted/50" id="armacoes">
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Glasses className="w-3.5 h-3.5" />
                        Coleção Exclusiva
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
                        Armações para Todos os Estilos
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Encontre a armação perfeita para o seu rosto. Filtre por gênero e formato e descubra modelos exclusivos.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10 space-y-4"
                >
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filtros
                        {activeFilters > 0 && (
                            <button
                                onClick={() => {
                                    setFiltroGenero("Todos");
                                    setFiltroFormato("Todos");
                                }}
                                className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                            >
                                <X className="w-3 h-3" />
                                Limpar ({activeFilters})
                            </button>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Gênero</p>
                            <div className="flex flex-wrap gap-2">
                                {generos.map((g) => (
                                    <FilterPill key={g} label={g} active={filtroGenero === g} onClick={() => setFiltroGenero(g)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Formato</p>
                            <div className="flex flex-wrap gap-2">
                                {formatos.map((f) => (
                                    <FilterPill key={f} label={f} active={filtroFormato === f} onClick={() => setFiltroFormato(f)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {produtosFiltrados.map((produto, i) => (
                            <motion.div
                                key={produto.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                {/* Image Area */}
                                <div className="relative overflow-hidden aspect-4/3 bg-linear-to-br from-gray-50 to-gray-100">
                                    <div className="absolute inset-0 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                                        <GlassesIcon cor={produto.cor} formato={produto.formato} />
                                    </div>
                                    <span className="absolute top-3 left-3 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                                        {produto.genero}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                        {produto.marca}
                                    </p>
                                    <h3 className="font-semibold text-primary text-sm mt-1 leading-tight">
                                        {produto.nome}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1.5">
                                        a partir de{" "}
                                        <span className="font-bold text-primary">{produto.preco}</span>
                                    </p>
                                    <a
                                        href={`https://wa.me/551123628799?text=Olá, gostaria de saber mais sobre a armação ${produto.nome} (${produto.marca}).`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 w-full flex items-center justify-center gap-1.5 bg-primary text-white text-sm py-2 rounded-xl hover:bg-primary/90 transition-colors font-medium cursor-pointer"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        Experimentar
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Empty State */}
                    {produtosFiltrados.length === 0 && (
                        <div className="col-span-full text-center py-16 text-muted-foreground">
                            <Glasses className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-medium">Nenhuma armação encontrada com esses filtros.</p>
                            <button
                                onClick={() => {
                                    setFiltroGenero("Todos");
                                    setFiltroFormato("Todos");
                                }}
                                className="mt-4 text-primary underline text-sm font-medium cursor-pointer hover:text-primary/80 transition-colors"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* CTA Final */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-muted-foreground mb-4">
                        Não encontrou o modelo ideal? Temos muito mais na loja!
                    </p>
                    <a
                        href="https://wa.me/551123628799?text=Olá, gostaria de conhecer as armações disponíveis."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Ver catálogo completo no WhatsApp
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
