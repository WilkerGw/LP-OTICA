"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Tag, Smartphone, Zap, Monitor, Activity, CheckCircle2, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: React.ElementType;
    image?: string;
    features?: string[];
    badge?: string;
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
        badgeColor: "bg-amber-100 text-amber-800",
        products: [
            {
                id: "evolution",
                name: "Optra Evolution 2.0",
                category: "Precisão Máxima",
                description: "Lente de maior precisão do portfólio. Utiliza a combinação máxima de dados para personalização total, adaptando-se perfeitamente ao seu estilo de vida único.",
                icon: Star,
                image: "/images/evolution.webp",
                features: ["Personalização biométrica", "Campo de visão ampliado", "Adaptação instantânea"],
                badge: "Premium"
            },
            {
                id: "luminous",
                name: "Optra Luminous",
                category: "Visão Contemporânea",
                description: "Desenvolvida para usuários conectados que alternam constantemente o foco entre dispositivos digitais e o ambiente ao redor, reduzindo a fadiga visual.",
                icon: Smartphone,
                image: "/images/luminous.webp",
                features: ["Otimização para telas", "Transições dinâmicas", "Conforto visual prolongado"]
            },
        ],
    },
    {
        id: "intermediate",
        title: "Intermediária",
        badge: "Custo-Benefício",
        badgeColor: "bg-blue-100 text-blue-800",
        products: [
            {
                id: "elite",
                name: "Optra Elite",
                category: "Performance Dinâmica",
                description: "Equilíbrio visual eficaz para diferentes distâncias. Indicada para quem busca qualidade superior com excelente custo-benefício para o dia a dia.",
                icon: Shield,
                image: "/images/elite.webp",
                features: ["Iniciação à tecnologia digital", "Campos intermediários estáveis", "Fácil adaptação"],
                badge: "Custo-Benefício"
            },
            {
                id: "harmony",
                name: "Optra Harmony",
                category: "Transição Suave",
                description: "Focada no equilíbrio entre qualidade e investimento. Oferece um corredor de progressão suave para uma experiência visual natural.",
                icon: Zap,
                image: "/images/harmony.webp",
                features: ["Progressão suave", "Visão nítida", "Excelente custo-benefício"]
            },
        ],
    },
    {
        id: "entry",
        title: "Entrada",
        badge: "Econômica",
        badgeColor: "bg-green-100 text-green-800",
        products: [
            {
                id: "handok",
                name: "Handok Multi",
                category: "Essencial",
                description: "Opção compacta e acessível com campos de visão básicos para atividades do dia a dia, mantendo a qualidade ótica necessária.",
                icon: Tag,
                image: "/images/multi.webp",
                features: ["Design funcional", "Campos visuais equilibrados", "Economia inteligente"],
                badge: "Básica"
            },
        ],
    },
    {
        id: "occupational",
        title: "Ocupacionais",
        badge: "Especializado",
        badgeColor: "bg-purple-100 text-purple-800",
        products: [
            {
                id: "office",
                name: "Optra Office",
                category: "Ambiente de Trabalho",
                description: "Foco exclusivo em visão de perto e intermediária. Ideal para escritório, leitura e computador.",
                icon: Monitor,
                image: "/images/evolution.webp", // Fallback image as none was specified
                features: ["Campo de perto ampliado", "Postura ergonômica", "Visão relaxada no PC"]
            },
            {
                id: "sport",
                name: "Optra Sport",
                category: "Performance Esportiva",
                description: "Projetada para armações esportivas com curvaturas acentuadas, garantindo visão periférica sem distorções.",
                icon: Activity,
                image: "/images/elite.webp", // Fallback image
                features: ["Compensação de curvatura", "Visão periférica total", "Ideal para óculos curvados"]
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
        <section className="bg-white py-12 relative overflow-hidden min-h-[800px] flex flex-col">
            <Container className="flex-1 flex flex-col">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                        Lentes Multifocais
                    </h2>
                </div>

                {/* Top Navigation - Horizontal Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8 z-20 relative">
                    {mainProducts.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => setSelectedProductId(product.id)}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 border font-medium text-sm shadow-sm overflow-visible",
                                selectedProductId === product.id
                                    ? "bg-purple-100 border-purple-200 text-purple-900 shadow-md transform scale-105"
                                    : "bg-purple-50 border-transparent text-slate-600 hover:bg-purple-100/50 hover:border-purple-100"
                            )}
                        >
                            {product.badge && (
                                <span className={cn(
                                    "absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm whitespace-nowrap z-20",
                                    selectedProductId === product.id
                                        ? "bg-purple-600 text-white"
                                        : "bg-slate-200 text-slate-600"
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
                <div className="flex-1 relative mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Lens Image - Large, Uncropped, Left/Center */}
                    <div className="lg:col-span-8 relative min-h-[200px] lg:min-h-[450px] flex items-center justify-center">
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
                                <div className="relative w-full aspect-[4/3] max-w-2xl">
                                    {selectedProduct.image ? (
                                        <Image
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            fill
                                            className="object-contain drop-shadow-2xl z-10"
                                            priority
                                            sizes="(max-width: 1024px) 100vw, 70vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                            Imagem indisponível
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Info Panel - Bottom Right */}
                    <div className="lg:col-span-4 flex flex-col justify-end pb-8 lg:pb-12 z-20 pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProduct.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="pointer-events-auto bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100/60 backdrop-blur-sm"
                            >
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider mb-3">
                                        {selectedProduct.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                        {selectedProduct.name}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                        {selectedProduct.description}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {selectedProduct.features?.slice(0, 3).map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                            </div>
                                            <span className="text-xs font-medium text-slate-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200/50 h-12 rounded-xl font-semibold text-sm tracking-wide">
                                    VER DETALHES
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
}
