import { CreditCard, Tag, Flame } from "lucide-react";
import { Container } from "@/components/ui/container";

interface Benefit {
    icon: React.ElementType;
    title: string;
}

const benefits: Benefit[] = [
    {
        icon: Tag,
        title: "10% OFF no PIX",
    },
    {
        icon: Flame,
        title: "Até 40% OFF",
    },
    {
        icon: CreditCard,
        title: "12x sem juros",
    },
];

export function BenefitCards() {
    return (
        <section className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-4xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/40 px-4 md:px-8 py-4">
                <div className="flex items-center justify-center gap-6 md:gap-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 group"
                        >
                            {/* Dark rounded-square icon */}
                            <div className="shrink-0 rounded-xl bg-foreground/90 p-2.5 text-white group-hover:scale-105 transition-transform duration-200">
                                <benefit.icon className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                            <p className="font-heading text-xs md:text-sm font-bold text-foreground leading-tight uppercase tracking-wider">
                                {benefit.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
