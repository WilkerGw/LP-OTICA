"use client";

import React, { useState } from "react";
import LensVisualizer from "./LensVisualizer";

const LensComparator = () => {
    const [refractiveIndex, setRefractiveIndex] = useState(1.50);

    return (
        <section className="bg-linear-to-b from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Simulador de Espessura de Lentes
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Veja a diferença real de espessura e estética entre os índices de refração.
                    </p>
                </div>

                <div className="w-full flex justify-center">
                    <LensVisualizer
                        selectedIndex={refractiveIndex}
                        setSelectedIndex={setRefractiveIndex}
                    />
                </div>
            </div>
        </section>
    );
};

export default LensComparator;
