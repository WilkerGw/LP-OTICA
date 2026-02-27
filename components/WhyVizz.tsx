"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
    Microscope,
    MapPin,
    Target,
    CreditCard,
    Zap,
    MessageSquare,
    Award,
} from "lucide-react";

const diferenciais = [
    {
        icone: Microscope,
        titulo: "Tecnologia Alemã",
        texto:
            "Lentes produzidas com tecnologia de precisão alemã para máxima clareza e durabilidade.",
    },
    {
        icone: MapPin,
        titulo: "Zona Leste de São Paulo",
        texto:
            "Atendemos clientes de Jardim Guaiaca, Itaquera, Sapopemba, Mooca e toda a Zona Leste.",
    },
    {
        icone: Target,
        titulo: "Especialistas em Multifocais",
        texto:
            "Mais de 3 anos adaptando lentes multifocais com altíssima taxa de satisfação.",
    },
    {
        icone: CreditCard,
        titulo: "Facilidade de Pagamento",
        texto:
            "12x sem juros no cartão ou 10% de desconto no PIX. Sua visão ao seu alcance.",
    },
    {
        icone: Zap,
        titulo: "Laboratório Rápido",
        texto: "Óculos monofocais prontos em até 3 dias úteis.",
    },
    {
        icone: MessageSquare,
        titulo: "Atendimento Personalizado",
        texto:
            "Cada cliente recebe orientação completa para escolher a lente e armação ideais.",
    },
];

export function WhyVizz() {
    return (
        <section className="section-padding bg-white" id="diferenciais">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Award className="w-3.5 h-3.5" />
                        Nossos diferenciais
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
                        Por que escolher a Vizz?
                    </h2>
                    <p className="text-primary/70 max-w-2xl mx-auto text-lg font-medium">
                        Combinamos tecnologia de ponta, atendimento humanizado e facilidade de pagamento para cuidar da sua visão.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {diferenciais.map((item, index) => {
                        const Icon = item.icone;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="group p-6 rounded-2xl bg-muted/40 hover:bg-muted/80 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-primary text-base mb-2">
                                    {item.titulo}
                                </h3>
                                <p className="text-primary/80 text-sm leading-relaxed font-medium">
                                    {item.texto}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
