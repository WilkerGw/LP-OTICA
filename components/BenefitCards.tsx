import { CreditCard, MapPin, Tag, Flame } from "lucide-react";
import { Container } from "@/components/ui/container";

interface Benefit {
    icon: React.ElementType;
    title: string;
    description: string;
}

const benefits: Benefit[] = [
    {
        icon: Tag,
        title: "10% OFF no PIX",
        description: "Pague à vista e economize",
    },
    {
        icon: Flame,
        title: "Até 40% OFF",
        description: "Em produtos selecionados",
    },
    {
        icon: CreditCard,
        title: "12x sem juros",
        description: "Parcele suas compras",
    },

];

export function BenefitCards() {
    return (
        <section className="relative z-20 bg-primary py-5 border-b border-white/10 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-black/40 md:backdrop-blur-md md:border-t md:border-white/10 md:rounded-t-3xl shadow-xl">
            <Container>
                <div className="flex flex-col lg:flex-row lg:justify-center gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center gap-4 text-left p-2 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                        >
                            <div className="shrink-0 rounded-full bg-secondary/10 p-2.5 text-secondary group-hover:scale-110 transition-transform">
                                <benefit.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-heading text-xs font-bold text-white leading-tight uppercase tracking-widest">
                                    {benefit.title}
                                </h3>
                                <p className="text-[10px] md:text-xs text-white/50 font-medium">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
