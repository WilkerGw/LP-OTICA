"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Tag, Smartphone, Zap, Monitor, Activity, CheckCircle2, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DistanceLevel {
    longe: number; // percentage 0-100
    meiaDistancia: number;
    perto: number;
}

interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: React.ElementType;
    image?: string;
    features?: string[];
    badge?: string;
    distances?: DistanceLevel;
    visionField?: string;
}

interface ProductLine {
    id: string;
    title: string;
    badge: string;
    badgeColor: string;
    products: Product[];
}

const lines: ProductLine[] = [
    {
        id: "premium",
        title: "Alta Performance",
        badge: "Premium",
        badgeColor: "bg-secondary/15 text-primary",
        products: [
            {
                id: "evolution",
                name: "Vizz Evolution 2.0",
                category: "Precisão Máxima",
                description: "Campos de visão mais amplos que garantem total equilíbrio do movimento. Elimina o movimento da cabeça em busca da melhor área nobre da lente.",
                icon: Star,
                image: "/images/evolution.webp",
                features: ["Visão para perto com foco imediato e preciso", "Excelente e amplo campo para longe", "Adaptação natural, imediata e garantida"],
                badge: "Premium",
                distances: { longe: 95, meiaDistancia: 90, perto: 95 },
                visionField: "98%"
            },
            {
                id: "luminous",
                name: "Vizz Luminous",
                category: "Visão Contemporânea",
                description: "Campos de visão amplos que garantem equilíbrio do movimento. Diminui o movimento da cabeça em busca da melhor área nobre da lente.",
                icon: Smartphone,
                image: "/images/luminous.webp",
                features: ["Visão para perto com foco preciso e confortável", "Amplo campo de visão para longe", "Adaptação rápida e natural"],
                distances: { longe: 85, meiaDistancia: 80, perto: 85 },
                visionField: "87%"
            },
        ],
    },
    {
        id: "intermediate",
        title: "Intermediária",
        badge: "Custo-Benefício",
        badgeColor: "bg-primary/10 text-primary",
        products: [
            {
                id: "elite",
                name: "Vizz Elite",
                category: "Performance Dinâmica",
                description: "Campos de visão equilibrados para todas as distâncias do olhar. Campo para longe preservado e amplo com suave corredor para meia distância.",
                icon: Shield,
                image: "/images/elite.webp",
                features: ["Corredor de progressão suave", "Campo para longe preservado e amplo", "Adaptação espontânea"],
                badge: "Custo-Benefício",
                distances: { longe: 70, meiaDistancia: 65, perto: 60 },
                visionField: "78%"
            },
            {
                id: "harmony",
                name: "Vizz Harmony",
                category: "Transição Suave",
                description: "Campos de visão equilibrados para todas as distâncias do olhar. Suave corredor de progressão com campo para longe preservado.",
                icon: Zap,
                image: "/images/harmony.webp",
                features: ["Suave corredor de progressão", "Campo para longe preservado", "Excelente relação custo e benefício"],
                distances: { longe: 60, meiaDistancia: 55, perto: 50 },
                visionField: "68%"
            },
        ],
    },
    {
        id: "entry",
        title: "Entrada",
        badge: "Econômica",
        badgeColor: "bg-secondary/20 text-primary",
        products: [
            {
                id: "handok",
                name: "Vizz Multi",
                category: "Essencial",
                description: "Campos de visão compactos e equilibrados. Corredor de progressão adequado para meia distância com adaptação espontânea.",
                icon: Tag,
                image: "/images/multi.webp",
                features: ["Corredor adequado para meia distância", "Adaptação espontânea", "Qualidade com investimento acessível"],
                badge: "Básica",
                distances: { longe: 40, meiaDistancia: 40, perto: 35 },
                visionField: "55%"
            },
        ],
    },
    {
        id: "occupational",
        title: "Ocupacionais",
        badge: "Especializado",
        badgeColor: "bg-primary/15 text-primary",
        products: [
            {
                id: "office",
                name: "Vizz Office",
                category: "Ambiente de Trabalho",
                description: "Foco exclusivo em visão de perto e intermediária. Ideal para escritório, leitura e computador.",
                icon: Monitor,
                image: "/images/evolution.webp", // Fallback image as none was specified
                features: ["Campo de perto ampliado", "Postura ergonômica", "Visão relaxada no PC"],
                distances: { longe: 20, meiaDistancia: 85, perto: 95 },
                visionField: "Intermediária+"
            },
            {
                id: "sport",
                name: "Vizz Sport",
                category: "Performance Esportiva",
                description: "Projetada para armações esportivas com curvaturas acentuadas, garantindo vision periférica sem distorções.",
                icon: Activity,
                image: "/images/elite.webp", // Fallback image
                features: ["Compensação de curvatura", "Visão periférica total", "Ideal para óculos curvados"],
                distances: { longe: 90, meiaDistancia: 60, perto: 40 },
                visionField: "Total"
            }
        ]
    }
];

export function ProductLines() {
    // Flatten products for easier access
    const allProducts = lines.flatMap(line => line.products.map(p => ({ ...p, lineTitle: line.title, lineBadge: line.badge, lineBadgeColor: line.badgeColor })));

    // Filter only the main lenses shown in the image reference (Multi, Harmony, Elite, Luminous, Evolution)
    const mainProductsId = ['handok', 'harmony', 'elite', 'luminous', 'evolution'];
    const mainProducts = allProducts.filter(p => mainProductsId.includes(p.id)).sort((a, b) => mainProductsId.indexOf(a.id) - mainProductsId.indexOf(b.id));

    const [selectedProductId, setSelectedProductId] = useState<string>("handok");

    const selectedProduct = allProducts.find(p => p.id === selectedProductId) || allProducts[0];

    return (
        <section className="bg-white section-padding relative overflow-hidden flex flex-col" id="produtos">
            <Container className="flex-1 flex flex-col">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-2 italic">
                        Lentes Multifocais Vizz
                    </h2>
                    <p className="text-muted-foreground text-sm font-medium">Descubra qual o campo de visão ideal para você</p>
                </div>

                {/* Top Navigation - Horizontal Buttons */}
                <div className="flex flex-wrap justify-center gap-8 mb-6 z-20 relative">
                    {mainProducts.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => setSelectedProductId(product.id)}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 border font-bold text-xs uppercase tracking-widest overflow-visible",
                                selectedProductId === product.id
                                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 transform scale-105"
                                    : "bg-muted/50 border-transparent text-muted-foreground hover:bg-secondary/10 hover:text-primary"
                            )}
                            aria-label={`Ver detalhes da lente ${product.name}`}
                            aria-selected={selectedProductId === product.id}
                            role="tab"
                        >
                            {product.badge && (
                                <span className={cn(
                                    "absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm whitespace-nowrap z-20",
                                    selectedProductId === product.id
                                        ? "bg-secondary text-primary"
                                        : "bg-primary/10 text-primary/60"
                                )}>
                                    {product.badge}
                                </span>
                            )}
                            <product.icon className="w-4 h-4" />
                            {product.name.replace("Optra ", "").replace("Handok ", "")} {/* Simplify names for tabs if needed */}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 relative grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Lens Image - Large, Uncropped, Left/Center */}
                    <div className="lg:col-span-7 relative min-h-[200px] lg:min-h-[350px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProduct.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full h-full flex items-center justify-center p-4"
                            >
                                {/* We use object-contain to ensure the "lente não seja cortada" */}
                                <div className="relative w-full aspect-[4/3] max-w-lg lg:max-w-md rounded-3xl overflow-hidden">
                                    {selectedProduct.image ? (
                                        <>
                                            <Image
                                                src={selectedProduct.image}
                                                alt={selectedProduct.name}
                                                fill
                                                className="object-contain drop-shadow-lg z-10"
                                                priority
                                                sizes="(max-width: 1024px) 100vw, 70vw"
                                            />
                                            {/* Vision Field Badge */}
                                            {selectedProduct.visionField && (
                                                <div className="absolute -top-[.5] right-4 md:top-1 md:right-8 z-20">
                                                    <div className="bg-primary/80 backdrop-blur-sm text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl shadow-xl border border-white/10 flex flex-col items-center">
                                                        <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-tighter opacity-70 leading-none mb-0.5">Visão</span>
                                                        <span className="text-xl md:text-3xl font-black italic leading-none">{selectedProduct.visionField}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                                            Imagem indisponível
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Info Panel - Bottom Right */}
                    <div className="lg:col-span-5 flex flex-col justify-end pb-4 lg:pb-6 z-20 pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProduct.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="pointer-events-auto bg-white rounded-3xl px-8 md:p-8"
                            >
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-primary mb-3">
                                        {selectedProduct.name}
                                    </h3>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {selectedProduct.features?.slice(0, 3).map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                                            </div>
                                            <span className="text-xs font-medium text-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Distance Optimization Bars */}
                                {selectedProduct.distances && (
                                    <div className="space-y-3 mb-6 pt-4 border-t border-border">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Campo de Visão</span>
                                        {[
                                            { label: "Longe", value: selectedProduct.distances.longe },
                                            { label: "Meia Dist.", value: selectedProduct.distances.meiaDistancia },
                                            { label: "Perto", value: selectedProduct.distances.perto },
                                        ].map((d) => (
                                            <div key={d.label} className="flex items-center gap-3">
                                                <span className="text-[10px] font-semibold text-primary w-16 shrink-0">{d.label}</span>
                                                <div className="flex-1 h-1.5 bg-muted rounded-full relative overflow-hidden">
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 bg-secondary rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${d.value}%` }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                    />
                                                </div>
                                                <div
                                                    className="w-2 h-2 rounded-full bg-secondary shrink-0 shadow-sm"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Button asChild size="lg" className="w-full shadow-lg shadow-secondary/20 rounded-2xl">
                                    <a href={`https://wa.me/551123628799?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20a%20lente%20${encodeURIComponent(selectedProduct.name)}.`} target="_blank" rel="noopener noreferrer">
                                        Solicitar Orçamento
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
}
