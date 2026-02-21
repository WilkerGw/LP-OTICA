"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Eye,
    Layers,
    Shield,
    Sparkles,
    Send,
    X,
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
        <span className="text-4xl md:text-5xl font-extrabold text-primary tracking-tighter">
            {display.toFixed(2).replace(".", ",")}
        </span>
    );
}

// ─── Component ───

export function LensSurvey() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

    // Determine total steps (skip vision field for monofocal)
    const isMultifocal = selections.lensType === "multifocal";
    const steps = isMultifocal ? [0, 1, 2, 3] : [0, 2, 3]; // indices into STEP_META
    const totalSteps = steps.length;
    const currentStepIndex = steps.indexOf(step);
    const isLastStep = currentStepIndex === totalSteps - 1;

    // Control body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

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
        setStep(0);
    }, []);

    const closeSurvey = useCallback(() => {
        setIsOpen(false);
        // Reset after animation if needed, or keep for "resume"
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
            `🎁 Brinde: Armação de Brinde Inclusa`,
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
            : ((currentStepIndex + 1) / totalSteps) * 100;

    return (
        <>
            {/* ─── HOME PAGE INTRO CARD ─── */}
            <section
                id="orcamento"
                className="relative bg-secondary py-12 lg:py-16 px-4 overflow-hidden"
            >
                {/* Subtle decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
                </div>

                <Container className="relative z-10">
                    <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Orçamento Instantâneo
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight tracking-tight">
                            Monte seu orçamento em segundos
                        </h2>
                        <p className="text-primary/70 text-lg mb-6 max-w-lg font-medium">
                            Responda algumas perguntas rápidas e descubra o valor estimado
                            das suas lentes, de forma simples e intuitiva.
                        </p>
                        <Button
                            onClick={() => setIsOpen(true)}
                            variant="default"
                            size="lg"
                            className="w-full sm:w-auto px-8 py-2 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all group bg-primary text-secondary hover:text-white"
                        >
                            <span>Começar</span>
                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </Container>
            </section>

            {/* ─── FULL SCREEN SURVEY MODAL ─── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto overflow-x-hidden safe-area-inset"
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-primary/5 py-4 px-4 sm:px-6">
                            <div className="max-w-5xl mx-auto flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Orcamento</h3>
                                        <p className="text-[10px] text-primary/40 font-black uppercase">Lifestyle Premium</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={closeSurvey}
                                    variant="ghost"
                                    className="rounded-full w-10 h-10 p-0 text-primary/40 hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 py-12 px-4 sm:px-6">
                            <Container className="relative">
                                <AnimatePresence mode="wait" custom={direction}>
                                    {/* ─── QUESTION STEPS ─── */}
                                    {step >= 0 && step <= 3 && (
                                        <motion.div
                                            key={`step-${step}`}
                                            variants={questionVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="max-w-4xl mx-auto"
                                        >
                                            {/* Progress bar */}
                                            <div className="mb-12">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs font-bold text-primary/40 uppercase tracking-widest">
                                                        Passo {currentStepIndex + 1} de {totalSteps}
                                                    </span>
                                                    <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-md">
                                                        {Math.round(progress)}%
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-primary/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Question Header */}
                                            <div className="text-center mb-12">
                                                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 shadow-inner">
                                                    {(() => {
                                                        const Icon = STEP_META[step].icon;
                                                        return <Icon className="w-8 h-8 text-primary" />;
                                                    })()}
                                                </div>
                                                <h3 className="text-3xl md:text-5xl font-black text-primary mb-4 tracking-tighter leading-tight">
                                                    {STEP_META[step].title}
                                                </h3>
                                                <p className="text-primary/60 text-base md:text-lg font-medium max-w-xl mx-auto">
                                                    {STEP_META[step].subtitle}
                                                </p>
                                            </div>

                                            {/* Options Grid */}
                                            <div
                                                className={`grid gap-5 mb-12 ${step === 0
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

                                            {/* Modal Navigation Footer */}
                                            <div className="flex items-center gap-4 py-8 border-t border-primary/5 sticky bottom-0 bg-white/95 backdrop-blur-sm z-20">
                                                <Button
                                                    onClick={goBack}
                                                    variant="ghost"
                                                    className={`h-16 px-8 rounded-2xl text-sm font-black transition-all ${currentStepIndex === 0
                                                        ? "opacity-0 pointer-events-none"
                                                        : "text-primary hover:bg-primary/5 active:scale-95 border-2 border-primary/10"
                                                        }`}
                                                    disabled={currentStepIndex === 0}
                                                >
                                                    <ChevronLeft className="w-5 h-5 mr-1" />
                                                    <span>Voltar</span>
                                                </Button>

                                                <Button
                                                    onClick={goNext}
                                                    disabled={!canAdvance()}
                                                    variant={canAdvance() ? "default" : "outline"}
                                                    className={`flex-1 h-16 rounded-2xl text-base font-black transition-all ${canAdvance()
                                                        ? "bg-primary text-secondary shadow-2xl shadow-primary/20 hover:text-white"
                                                        : "bg-primary/5 text-primary/20 cursor-not-allowed border-none"
                                                        }`}
                                                >
                                                    <span>{isLastStep ? "Ver Resultado" : "Próxima Etapa"}</span>
                                                    <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                                                </Button>
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
                                            className="max-w-2xl mx-auto"
                                        >
                                            {/* Result Card */}
                                            <div className="bg-[#FAFAF9] border border-primary/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                                                {/* Decorative */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                                                <div className="text-center mb-10">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-primary/20">
                                                        <Check className="w-3 h-3" />
                                                        Orçamento Concluído
                                                    </div>
                                                    <h3 className="text-3xl md:text-5xl font-black text-primary mb-2 tracking-tighter">
                                                        Resultado Estimado
                                                    </h3>
                                                    <p className="text-primary/40 text-xs font-black uppercase tracking-widest">
                                                        Cálculo baseado nas suas escolhas
                                                    </p>
                                                </div>

                                                {/* Price Container */}
                                                <div className="bg-white rounded-3xl p-8 mb-10 text-center shadow-lg border border-primary/5">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-xl text-primary/20 line-through mb-1 font-bold">
                                                            R$ {budget.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                                        </span>
                                                        <div className="leading-tight flex items-baseline gap-2">
                                                            <span className="text-2xl font-black text-primary/40">R$</span>
                                                            <AnimatedPrice value={Math.max(0, budget.total - 200)} />
                                                        </div>
                                                        <div className="bg-secondary/20 text-secondary text-[10px] font-black px-3 py-1 rounded-full mt-4 uppercase tracking-tighter">
                                                            Armação de Brinde Inclusa 🎁
                                                        </div>
                                                    </div>
                                                    <p className="text-primary/50 text-sm mt-6 font-medium">
                                                        Ou em até <span className="text-primary font-black">10x de R$ {(Math.max(0, budget.total - 200) / 10).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                                                    </p>
                                                </div>

                                                {/* WhatsApp CTA */}
                                                <a
                                                    href={buildWhatsAppLink()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-center gap-4 h-20 bg-primary text-white font-black rounded-3xl transition-all shadow-[0_20px_40px_-10px_rgba(var(--primary),0.3)] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-lg uppercase tracking-tight"
                                                >
                                                    <Send className="w-6 h-6 text-secondary" />
                                                    <span className="text-secondary">Garantir este Desconto</span>
                                                </a>

                                                {/* Actions */}
                                                <div className="grid grid-cols-2 gap-4 mt-8">
                                                    <Button
                                                        onClick={goBack}
                                                        variant="ghost"
                                                        className="h-14 rounded-2xl bg-primary/5 text-primary font-black hover:bg-primary/10 transition-all"
                                                    >
                                                        <ChevronLeft className="w-5 h-5 mr-2" />
                                                        <span>Ajustar Escolhas</span>
                                                    </Button>
                                                    <Button
                                                        onClick={restart}
                                                        variant="ghost"
                                                        className="h-14 rounded-2xl bg-primary/5 text-primary font-black hover:bg-primary/10 transition-all"
                                                    >
                                                        <span>Refazer Tudo</span>
                                                    </Button>
                                                </div>
                                            </div>

                                            <p className="text-center text-primary/30 text-[10px] font-bold mt-8 max-w-sm mx-auto uppercase leading-relaxed">
                                                * Valores sujeitos a alteração após análise da receita completa em nossa loja física.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Container>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
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
            className={`group relative text-left p-4 md:p-5 rounded-[32px] border-2 transition-all duration-300 cursor-pointer ${selected
                ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10"
                : "border-primary/5 bg-primary/2 hover:border-primary/10 hover:bg-white hover:shadow-xl"
                }`}
        >
            {/* Checkbox / Radio indicator */}
            <div
                className={`absolute top-4 right-4 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${selected
                    ? "border-primary bg-primary rotate-0 scale-100"
                    : "border-primary/10 bg-transparent -rotate-12 scale-90"
                    }`}
            >
                {selected && <Check className="w-4 h-4 text-secondary" strokeWidth={4} />}
            </div>

            <div className="pr-10">
                <h4 className="text-xl md:text-2xl font-black text-primary mb-1 tracking-tighter leading-none">{label}</h4>
                <p className="text-sm text-primary/50 font-medium leading-relaxed mb-3">
                    {description}
                </p>

                {image && (
                    <div className="mb-4 rounded-3xl overflow-hidden border-2 border-primary/5 relative w-full aspect-[4/3] bg-white shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            alt={label}
                            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                )}

                {recommended && (
                    <div className="inline-flex items-center px-3 py-2 rounded-xl bg-primary shadow-lg shadow-primary/20 mb-4">
                        <span className="text-[10px] md:text-xs font-black text-white/90 uppercase tracking-widest">
                            Ideal: <span className="text-secondary">{recommended}</span>
                        </span>
                    </div>
                )}

                {(priceLabel || (price !== undefined && price > 0)) && (
                    <span
                        className={`inline-block text-xs font-black px-4 py-2 rounded-xl uppercase tracking-wider ${selected
                            ? "bg-primary text-white"
                            : "bg-primary/5 text-primary/40"
                            }`}
                    >
                        {priceLabel ?? `R$ ${price}`}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
