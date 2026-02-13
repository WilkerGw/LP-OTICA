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
        title: "Até 70% OFF",
        description: "Em produtos selecionados",
    },
    {
        icon: CreditCard,
        title: "12x sem juros",
        description: "Parcele suas compras",
    },
    {
        icon: MapPin,
        title: "Nossas Lojas",
        description: "Visite-nos e conheça nossa estrutura",
    },
];

export function BenefitCards() {
    return (
        <section className="relative z-20 bg-primary py-4 border-b border-white/10 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-black/30 md:backdrop-blur-md md:border-t md:border-b-0">
            <Container>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center gap-4 text-left p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <div className="shrink-0 rounded-full bg-white/5 p-2 text-secondary">
                                <benefit.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-heading text-base font-semibold text-white leading-tight">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs text-white/70">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
