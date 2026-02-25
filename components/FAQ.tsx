"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ChevronDown, HelpCircle } from "lucide-react";

const perguntas = [
    {
        pergunta: "As Óticas Vizz realizam exames de vista?",
        resposta:
            "Sim! Oferecemos exames de vista gratuitos. No momento, estamos em um breve intervalo nos atendimentos e retornaremos com a agenda aberta a partir de Maio. Você já pode falar conosco para garantir sua vaga!",
    },
    {
        pergunta: "Qual o prazo para meus óculos ficarem prontos?",
        resposta:
            "Trabalhamos para entregar sua visão perfeita o quanto antes. O prazo médio é de 7 dias úteis para lentes monofocais e 10 dias úteis para lentes multifocais.",
    },
    {
        pergunta: "Posso parcelar meus óculos?",
        resposta:
            "Sim! Parcelamos em até 12x sem juros no cartão de crédito. Pagamentos à vista no PIX têm 10% de desconto.",
    },
    {
        pergunta: "O que são lentes multifocais?",
        resposta:
            "Lentes multifocais substituem dois ou mais pares de óculos em um único, permitindo enxergar bem de longe, de perto e a distâncias intermediárias. São ideais para quem tem presbiopia (vista cansada).",
    },
    {
        pergunta: "Qual a diferença entre lentes com e sem antirreflexo?",
        resposta:
            "O tratamento antirreflexo elimina reflexos indesejados causados por telas, faróis e iluminação artificial, melhorando muito a nitidez e o conforto visual, especialmente à noite.",
    },
];

export function FAQ() {
    const [aberto, setAberto] = useState<number | null>(null);

    const toggle = (index: number) => {
        setAberto(aberto === index ? null : index);
    };

    return (
        <section className="section-padding bg-white" id="faq">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Tire suas dúvidas
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Reunimos as dúvidas mais comuns dos nossos clientes para facilitar seu atendimento.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {perguntas.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between gap-4 p-5 bg-muted/50 hover:bg-muted rounded-2xl transition-colors text-left cursor-pointer group"
                                aria-expanded={aberto === index}
                            >
                                <span className="font-semibold text-primary text-sm md:text-base leading-tight">
                                    {item.pergunta}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${aberto === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {aberto === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 pt-2 text-muted-foreground text-sm md:text-base leading-relaxed">
                                            {item.resposta}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
