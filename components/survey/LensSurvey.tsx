"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Eye,
    Layers,
    Shield,
    Sparkles,
    Send,
} from "lucide-react";
import {
    LENS_TYPES,
    VISION_FIELDS,
    REFRACTIVE_INDICES,
    TREATMENTS,
    calculateBudget,
} from "./surveyData";

// ─── Types ───

interface Selections {
    lensType: string;
    visionField: string | null;
    refractiveIndex: string;
    treatments: string[];
}

const INITIAL_SELECTIONS: Selections = {
    lensType: "",
    visionField: null,
    refractiveIndex: "",
    treatments: [],
};

// ─── Step definitions ───

const STEP_META = [
    {
        title: "Qual tipo de lente você precisa?",
        subtitle: "Selecione o tipo ideal para sua necessidade visual.",
        icon: Eye,
    },
    {
        title: "Qual campo de visão você prefere?",
        subtitle: "Para lentes multifocais, escolha a tecnologia do corredor.",
        icon: Layers,
    },
    {
        title: "Qual índice de refração?",
        subtitle: "Quanto maior o índice, mais fina e leve será a lente.",
        icon: Sparkles,
    },
    {
        title: "Deseja adicionar tratamentos?",
        subtitle: "Selecione um ou mais tratamentos para suas lentes.",
        icon: Shield,
    },
];

// ─── Animation variants ───

const questionVariants = {
    initial: { opacity: 0, y: 40, scale: 0.97 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 260, damping: 28 },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: { duration: 0.2 },
    },
};

const cardVariants = {
    initial: { opacity: 0, y: 24 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 26,
            delay: i * 0.08,
        },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

// ─── Animated Counter ───

function AnimatedPrice({ value }: { value: number }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const duration = 800;
        const start = performance.now();
        const from = display;
        const to = value;

        function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            // Do not round during animation to keep it smooth, but we will format display
            setDisplay(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        // intentionally only re-run when target value changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            R$ {display.toFixed(2).replace(".", ",")}
        </span>
    );
}

// ─── Component ───

export function LensSurvey() {
    const [step, setStep] = useState(-1); // -1 = intro/CTA
    const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

    // Determine total steps (skip vision field for monofocal)
    const isMultifocal = selections.lensType === "multifocal";
    const steps = isMultifocal ? [0, 1, 2, 3] : [0, 2, 3]; // indices into STEP_META
    const totalSteps = steps.length;
    const currentStepIndex = steps.indexOf(step);
    const isLastStep = currentStepIndex === totalSteps - 1;

    // Auto-select Antirreflexo for Multifocal
    useEffect(() => {
        if (isMultifocal) {
            setSelections(prev => {
                if (!prev.treatments.includes("antirreflexo")) {
                    return { ...prev, treatments: [...prev.treatments, "antirreflexo"] };
                }
                return prev;
            });
        }
    }, [isMultifocal]);

    const canAdvance = useCallback(() => {
        if (step === 0) return selections.lensType !== "";
        if (step === 1) return selections.visionField !== null;
        if (step === 2) return selections.refractiveIndex !== "";
        if (step === 3) return true; // treatments are optional
        return false;
    }, [step, selections]);

    const goNext = useCallback(() => {
        setDirection(1);
        if (isLastStep) {
            setStep(99); // result step
        } else {
            setStep(steps[currentStepIndex + 1]);
        }
    }, [isLastStep, steps, currentStepIndex]);

    const goBack = useCallback(() => {
        setDirection(-1);
        if (step === 99) {
            setStep(steps[totalSteps - 1]);
        } else if (currentStepIndex > 0) {
            setStep(steps[currentStepIndex - 1]);
        }
    }, [step, steps, currentStepIndex, totalSteps]);

    const restart = useCallback(() => {
        setDirection(-1);
        setSelections(INITIAL_SELECTIONS);
        setStep(-1);
    }, []);

    const selectOption = useCallback(
        (field: keyof Selections, value: string) => {
            setSelections((prev) => ({ ...prev, [field]: value }));
        },
        []
    );

    const toggleTreatment = useCallback((id: string) => {
        setSelections((prev) => ({
            ...prev,
            treatments: prev.treatments.includes(id)
                ? prev.treatments.filter((t) => t !== id)
                : [...prev.treatments, id],
        }));
    }, []);

    // Build budget
    const budget = calculateBudget(selections);

    // Build WhatsApp message
    const buildWhatsAppLink = () => {
        const lensLabel =
            LENS_TYPES.find((l) => l.id === selections.lensType)?.label ?? "";
        const fieldLabel = selections.visionField
            ? VISION_FIELDS.find((v) => v.id === selections.visionField)?.label ?? ""
            : "";
        const indexLabel =
            REFRACTIVE_INDICES.find((i) => i.id === selections.refractiveIndex)
                ?.label ?? "";
        const treatmentLabels = selections.treatments
            .map((tId) => TREATMENTS.find((t) => t.id === tId)?.label)
            .filter(Boolean)
            .join(", ");

        const lines = [
            `Olá! Fiz o orçamento automático no site e gostaria de confirmar:`,
            ``,
            `🔹 Lente: ${lensLabel}`,
            fieldLabel ? `🔹 Campo: ${fieldLabel}` : "",
            `🔹 Índice: ${indexLabel}`,
            treatmentLabels ? `🔹 Tratamentos: ${treatmentLabels}` : "",
            ``,
            `💰 Valor Original: R$ ${budget.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            `🏷️ Desconto: - R$ 200,00`,
            `✅ Valor Final: R$ ${(budget.total - 200).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        ]
            .filter(Boolean)
            .join("\n");

        return `https://wa.me/551123628799?text=${encodeURIComponent(lines)}`;
    };

    // Progress bar
    const progress =
        step === 99
            ? 100
            : step === -1
                ? 0
                : ((currentStepIndex + 1) / totalSteps) * 100;

    return (
        <section
            id="orcamento"
            className="relative bg-primary py-16 md:py-24 overflow-hidden"
        >
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/3 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                <AnimatePresence mode="wait" custom={direction}>
                    {/* ─── INTRO STATE ─── */}
                    {step === -1 && (
                        <motion.div
                            key="intro"
                            variants={questionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex flex-col items-center text-center max-w-2xl mx-auto"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-secondary/15 flex items-center justify-center mb-6">
                                <Eye className="w-8 h-8 text-secondary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                Monte seu orçamento
                                <span className="text-secondary"> em segundos</span>
                            </h2>
                            <p className="text-white/60 text-lg mb-10 max-w-lg">
                                Responda algumas perguntas rápidas e descubra o valor estimado
                                das suas lentes, sem compromisso.
                            </p>
                            <button
                                onClick={() => {
                                    setDirection(1);
                                    setStep(0);
                                }}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-primary font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:brightness-105 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                            >
                                Começar
                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </motion.div>
                    )}

                    {/* ─── QUESTION STEPS ─── */}
                    {step >= 0 && step <= 3 && (
                        <motion.div
                            key={`step-${step}`}
                            variants={questionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="max-w-3xl mx-auto"
                        >
                            {/* Progress bar */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                                        Passo {currentStepIndex + 1} de {totalSteps}
                                    </span>
                                    <span className="text-xs font-medium text-secondary">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-secondary rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="text-center mb-10">
                                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mx-auto mb-5">
                                    {(() => {
                                        const Icon = STEP_META[step].icon;
                                        return <Icon className="w-6 h-6 text-secondary" />;
                                    })()}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {STEP_META[step].title}
                                </h3>
                                <p className="text-white/50 text-sm md:text-base">
                                    {STEP_META[step].subtitle}
                                </p>
                            </div>

                            {/* Options */}
                            <div
                                className={`grid gap-4 ${step === 0
                                    ? "grid-cols-1 sm:grid-cols-2"
                                    : step === 3
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1 sm:grid-cols-3"
                                    }`}
                            >
                                {step === 0 &&
                                    LENS_TYPES.map((opt, i) => (
                                        <OptionCard
                                            key={opt.id}
                                            index={i}
                                            label={opt.label}
                                            description={opt.description}
                                            selected={selections.lensType === opt.id}
                                            onClick={() => selectOption("lensType", opt.id)}
                                        />
                                    ))}

                                {step === 1 &&
                                    VISION_FIELDS.map((opt, i) => (
                                        <OptionCard
                                            key={opt.id}
                                            index={i}
                                            label={opt.label}
                                            description={opt.description}
                                            image={opt.image}
                                            selected={selections.visionField === opt.id}
                                            onClick={() => selectOption("visionField", opt.id)}
                                        />
                                    ))}

                                {step === 2 &&
                                    REFRACTIVE_INDICES.map((opt, i) => {
                                        return (
                                            <OptionCard
                                                key={opt.id}
                                                index={i}
                                                label={opt.label}
                                                description={opt.description}
                                                recommended={opt.recommendedRange}
                                                selected={selections.refractiveIndex === opt.id}
                                                onClick={() => setSelections({ ...selections, refractiveIndex: opt.id })}
                                            />
                                        );
                                    })}

                                {step === 3 &&
                                    TREATMENTS.map((opt, i) => {
                                        const isIncluded = isMultifocal && opt.id === "antirreflexo";
                                        return (
                                            <OptionCard
                                                key={opt.id}
                                                index={i}
                                                label={isIncluded ? `${opt.label} (Incluso)` : opt.label}
                                                description={opt.description}
                                                selected={selections.treatments.includes(opt.id) || (isIncluded)}
                                                onClick={() => toggleTreatment(opt.id)}
                                                multi
                                            />
                                        );
                                    })}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-10">
                                <button
                                    onClick={goBack}
                                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${currentStepIndex === 0
                                        ? "text-white/20 pointer-events-none"
                                        : "text-white/60 hover:text-white hover:bg-white/10"
                                        }`}
                                    disabled={currentStepIndex === 0}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Voltar
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={!canAdvance()}
                                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${canAdvance()
                                        ? "bg-secondary text-primary shadow-md shadow-secondary/20 hover:shadow-lg hover:brightness-105 hover:scale-[1.02] active:scale-[0.97]"
                                        : "bg-white/10 text-white/30 pointer-events-none"
                                        }`}
                                >
                                    {isLastStep ? "Ver orçamento" : "Próximo"}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ─── RESULT STEP ─── */}
                    {step === 99 && (
                        <motion.div
                            key="result"
                            variants={questionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="max-w-lg mx-auto"
                        >
                            {/* Result Card */}
                            <div className="bg-white/6 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
                                <div className="text-center mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-7 h-7 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        Seu orçamento estimado
                                    </h3>
                                    <p className="text-white/40 text-sm">
                                        Valores por par de lentes
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-lg text-white/40 line-through mb-1">
                                            R$ {budget.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                        </span>
                                        <div className="text-4xl md:text-5xl font-extrabold text-secondary leading-none">
                                            <AnimatedPrice value={Math.max(0, budget.total - 200)} />
                                        </div>
                                    </div>
                                    <p className="text-white/40 text-xs mt-2">
                                        ou até 10x de R${" "}
                                        {(Math.max(0, budget.total - 200) / 10).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                                    {budget.breakdown.map((item, i) => (
                                        <div className="flex justify-between text-sm text-white/50 mb-2 border-b border-white/5 pb-2 last:border-0" key={i}>
                                            <span>{item.label}</span>
                                            <span className="font-medium text-white">
                                                {item.value === 0 ? "Incluso" : `R$ ${item.value.toFixed(2).replace('.', ',')}`}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-sm text-secondary/80 mb-2 border-b border-white/5 pb-2 last:border-0 font-medium">
                                        <span>Desconto Especial</span>
                                        <span>- R$ 200,00</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm border-t border-white/10 pt-3 mt-3">
                                        <span className="text-white font-bold">Total</span>
                                        <span className="text-secondary font-bold tabular-nums">
                                            R$ {(Math.max(0, budget.total - 200)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>

                                {/* CTAs */}
                                <a
                                    href={buildWhatsAppLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-primary font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:brightness-105 hover:scale-[1.02] active:scale-[0.97] cursor-pointer text-base"
                                >
                                    <Send className="w-5 h-5" />
                                    Confirmar pelo WhatsApp
                                </a>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={goBack}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/50 text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:text-white/80 cursor-pointer"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Voltar
                                    </button>
                                    <button
                                        onClick={restart}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/50 text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:text-white/80 cursor-pointer"
                                    >
                                        Refazer
                                    </button>
                                </div>
                            </div>

                            <p className="text-center text-white/30 text-xs mt-6">
                                * Valores estimados. O orçamento final pode variar de acordo com
                                a receita e tipo de armação.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </section>
    );
}

// ─── Option Card subcomponent ───

function OptionCard({
    index,
    label,
    description,
    price,
    priceLabel,
    recommended,
    image,
    selected,
    onClick,
    multi = false,
}: {
    index: number;
    label: string;
    description: string;
    price?: number;
    priceLabel?: string;
    recommended?: string;
    image?: string;
    selected: boolean;
    onClick: () => void;
    multi?: boolean;
}) {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClick}
            className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${selected
                ? "border-secondary bg-secondary/10 shadow-md shadow-secondary/10"
                : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/6"
                }`}
        >
            {/* Checkbox / Radio indicator */}
            <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${selected
                    ? "border-secondary bg-secondary"
                    : "border-white/20 bg-transparent"
                    }`}
            >
                {selected && <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />}
            </div>

            <div className="pr-8">
                <h4 className="text-base font-bold text-white mb-1">{label}</h4>
                <p className="text-xs text-white/40 leading-relaxed mb-3">
                    {description}
                </p>

                {image && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-white/10 relative w-full aspect-video bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            alt={label}
                            className="w-full h-full object-contain transition-opacity"
                        />
                    </div>
                )}

                {recommended && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 mb-3">
                        <span className="text-[10px] sm:text-xs font-medium text-white/70">
                            Recomendado: <span className="text-secondary/90">{recommended}</span>
                        </span>
                    </div>
                )}

                {(priceLabel || (price !== undefined && price > 0)) && (
                    <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg ${selected
                            ? "bg-secondary/20 text-secondary"
                            : "bg-white/5 text-white/50"
                            }`}
                    >
                        {priceLabel ?? `R$ ${price}`}
                    </span>
                )}
            </div>
            {price === undefined && !priceLabel && multi && (
                <span className="inline-block text-xs text-white/30">&nbsp;</span>
            )}
        </motion.div>
    );
}
