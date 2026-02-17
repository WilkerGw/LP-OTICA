import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
    return (
        <section className="bg-muted py-16 md:py-24">
            <Container>
                <div className="mx-auto max-w-3xl text-center space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/logo.webp"
                            alt="Óticas Vizz"
                            width={300}
                            height={120}
                            className="object-contain w-[200px] h-auto md:w-[300px]"
                            priority
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl font-medium text-primary/80 tracking-wide uppercase">
                            Lifestyle Premium
                        </h3>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                            Mais que uma ótica, um estilo de vida. Trazemos o que há de mais moderno em tecnologia óptica e design, garantindo que você enxergue o mundo com clareza e elegância.
                        </p>
                    </div>

                    {/* Decorative element */}
                    <div className="flex justify-center gap-2 pt-4">
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary/40" />
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary/70" />
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 shadow-lg shadow-secondary/20">
                            <a href="https://wa.me/551123628799?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Solicite seu Orçamento
                            </a>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
