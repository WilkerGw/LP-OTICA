import { Container } from "@/components/ui/container";
import Image from "next/image";

export function AboutSection() {
    return (
        <section className="bg-gray-50 py-16 md:py-24">
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
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                            Mais que uma ótica, um estilo de vida. Trazemos o que há de mais moderno em tecnologia óptica e design, garantindo que você enxergue o mundo com clareza e elegância.
                        </p>
                    </div>

                    {/* Decorative element */}
                    <div className="flex justify-center gap-2 pt-4">
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary/40" />
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary/70" />
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
