"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Star, Quote, Users } from "lucide-react";

const depoimentos = [
    {
        nome: "Debora Silva",
        bairro: "Google Maps",
        texto:
            "Atendimento impecável, melhor ótica da região, ambiente super agradável e profissionalismo capacitados.",
        estrelas: 5,
    },
    {
        nome: "Marina Chaves",
        bairro: "Google Maps",
        texto:
            "A melhor coisa experiência de compra e atendimento, super recomendo, podem comprar sem medo, qualidade e procedência no melhor lugar.",
        estrelas: 5,
    },
    {
        nome: "Junior Bronze",
        bairro: "Google Maps",
        texto:
            "Ótica maravilhosa super indico tanto no atendimento , quanto nos óculos!",
        estrelas: 5,
    },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star
                    key={i}
                    className="w-4 h-4 fill-secondary text-secondary"
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    return (
        <section className="section-padding bg-primary text-white" id="depoimentos">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Users className="w-3.5 h-3.5" />
                        Depoimentos
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                        O que nossos clientes dizem
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto text-lg font-medium">
                        A satisfação dos nossos clientes é o que nos move todos os dias.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {depoimentos.map((d, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                            <Quote className="w-8 h-8 text-secondary/30 mb-4" />
                            <p className="text-white/80 text-sm leading-relaxed mb-5">
                                &ldquo;{d.texto}&rdquo;
                            </p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-white text-sm">
                                        {d.nome}
                                    </p>
                                    <p className="text-white/60 text-xs font-medium">{d.bairro}</p>
                                </div>
                                <Stars count={d.estrelas} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
