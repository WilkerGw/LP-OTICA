"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LensSurvey = dynamic(() => import("./LensSurvey"), {
    ssr: false,
    loading: () => (
        <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-primary/50">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium animate-pulse">Carregando Simulador de Lentes...</p>
        </div>
    ),
});

export default function DynamicSurvey() {
    return <LensSurvey />;
}
