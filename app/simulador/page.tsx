import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LensComparator from "@/components/tools/LensComparator";
import { Button } from "@/components/ui/button";

export default function SimulatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header / Nav */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
                                <ArrowLeft className="w-4 h-4" />
                                Voltar
                            </Button>
                        </Link>
                        <h1 className="text-lg font-bold text-slate-800 hidden sm:block">
                            Simulador de Lentes Vizz
                        </h1>
                    </div>
                    <div>
                        {/* Placeholder for Logo or other visual element */}
                        <span className="font-bold text-teal-600 tracking-tight">Vizz Vision</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="py-8">
                <LensComparator />
            </div>
        </main>
    );
}
