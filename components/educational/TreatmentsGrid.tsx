import { Container } from "@/components/ui/container";
import { Sun, Monitor, Droplets, Zap, Shield, Eye, Moon, Fingerprint, Glasses } from "lucide-react";

interface Treatment {
    icon: React.ElementType;
    name: string;
    description: string;
}

const treatments: Treatment[] = [
    { icon: Sun, name: "Antirreflexo", description: "Elimina reflexos e brilhos para visão mais nítida." },
    { icon: Monitor, name: "Filtro de Luz Azul", description: "Protege contra luz nociva de telas digitais." },
    { icon: Droplets, name: "Hidrofóbico", description: "Repele água e facilita a limpeza." },
    { icon: Zap, name: "Anti-estático", description: "Evita o acúmulo de poeira na superfície." },
    { icon: Shield, name: "Anti-risco", description: "Maior resistência contra arranhões do dia a dia." },
    { icon: Eye, name: "Proteção UV", description: "Bloqueia 100% dos raios UVA e UVB." },
    { icon: Moon, name: "Fotossensível", description: "Escurece no sol e clareia em ambientes internos." },
    { icon: Fingerprint, name: "Oleofóbico", description: "Repele gordura e marcas de dedo." },
    { icon: Glasses, name: "Polarização", description: "Elimina reflexos intensos e ofuscamento." },
];

export function TreatmentsGrid() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-4">
                        Tratamentos Disponíveis
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Tecnologias que protegem seus olhos e prolongam a vida útil das suas lentes.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {treatments.map((item, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl bg-card border border-border hover:border-secondary/50 transition-all hover:shadow-md"
                        >
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-secondary group-hover:text-primary transition-all group-hover:scale-110">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                                {item.name}
                            </h3>
                            <p className="text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
