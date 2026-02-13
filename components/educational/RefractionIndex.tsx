"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import LensVisualizer from "../tools/LensComparator/LensVisualizer";

export function RefractionIndex() {
    const [refractiveIndex, setRefractiveIndex] = useState(1.50);

    return (
        <section className="py-20 bg-slate-50" id="simulador">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl mb-4">
                        Simulador de Espessura
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Veja na prática como o índice de refração influencia na espessura das suas lentes.
                    </p>
                </div>

                <div className="w-full flex justify-center">
                    <LensVisualizer
                        selectedIndex={refractiveIndex}
                        setSelectedIndex={setRefractiveIndex}
                    />
                </div>
            </Container>
        </section>
    );
}

