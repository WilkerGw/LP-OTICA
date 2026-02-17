// ─── Lens Survey: Pricing & Step Definitions ───

export interface SurveyOption {
    id: string;
    label: string;
    description: string;
    price: number;
    monofocalPrice?: number;
    recommendedRange?: string;
    image?: string;
    icon?: string;
}

// Step 1: Lens Type
export const LENS_TYPES: SurveyOption[] = [
    {
        id: "monofocal",
        label: "Monofocal",
        description: "Correção para uma única distância: longe ou perto.",
        price: 359.90,
    },
    {
        id: "multifocal",
        label: "Multifocal",
        description: "Visão nítida em todas as distâncias: longe, intermediário e perto.",
        price: 599.90,
    },
];

// Step 2: Field of Vision (multifocal only - tiered pricing)
export const VISION_FIELDS: SurveyOption[] = [
    {
        id: "basica",
        label: "Básica",
        description: "Lente de entrada com campo visual padrão.",
        price: 599.90,
        image: "/images/basica.webp",
    },
    {
        id: "intermediaria",
        label: "Intermediária",
        description: "Campo de visão ampliado para maior conforto.",
        price: 999.90,
        image: "/images/intermediaria.webp",
    },
    {
        id: "premium",
        label: "Premium",
        description: "Campo máximo com tecnologia personalizada de ponta.",
        price: 1799.90,
        image: "/images/premium.webp",
    },
];



// Step 3: Refractive Index
export const REFRACTIVE_INDICES: SurveyOption[] = [
    {
        id: "1.50",
        label: "1.50 Standard",
        description: "CR-39 — Econômica, ideal para graus baixos.",
        price: 0,
        monofocalPrice: 359.90,
        recommendedRange: "0 a 2 (Baixo grau)",
    },
    {
        id: "1.56",
        label: "1.56 Mid-Index",
        description: "Levemente mais fina (+15%). Bom custo-benefício.",
        price: 40,
        monofocalPrice: 399.90,
        recommendedRange: "2 a 3 (Transição de baixo para moderado)",
    },
    {
        id: "1.59",
        label: "1.59 Policarbonato",
        description: "Resistente a impacto. Ideal para crianças e esportes.",
        price: 60,
        monofocalPrice: 449.90,
        recommendedRange: "2 a 4 (Grau moderado / Foco em resistência)",
    },
    {
        id: "1.61",
        label: "1.61 Alto Índice",
        description: "Mais fina e resistente. Ótima transparência.",
        price: 150, // estimated relative to others
        monofocalPrice: 599.90,
        recommendedRange: "3 a 5 (Grau moderado / Foco em nitidez)",
    },
    {
        id: "1.67",
        label: "1.67 High-Index",
        description: "Fina e estética. Ótima para graus médios e altos.",
        price: 120,
        monofocalPrice: 899.90,
        recommendedRange: "4 a 7 (Grau alto / Foco em espessura)",
    },
    {
        id: "1.74",
        label: "1.74 Ultra Fina",
        description: "A mais fina disponível. Para graus muito altos.",
        price: 220,
        monofocalPrice: 1599.90,
        recommendedRange: "Acima de 7 (Grau muito alto / Estética máxima)",
    },
];

// Step 4: Treatments (multi-select)
export const TREATMENTS: SurveyOption[] = [
    {
        id: "antirreflexo",
        label: "Antirreflexo",
        description: "Elimina reflexos de telas e luzes.",
        price: 40,
    },
    {
        id: "filtro-azul",
        label: "Filtro de Luz Azul",
        description: "Protege contra a luz azul de telas.",
        price: 100,
    },
    {
        id: "fotossensivel",
        label: "Fotossensível",
        description: "Escurece no sol, clareia em interiores.",
        price: 120,
    },
    {
        id: "hidrofobico",
        label: "Hidrofóbico",
        description: "Repele água e facilita a limpeza.",
        price: 150,
    },
    {
        id: "polarizado",
        label: "Polarizado",
        description: "Elimina reflexos de superfícies brilhantes.",
        price: 150,
    },
];

// Budget calculation
export function calculateBudget(selections: {
    lensType: string;
    visionField: string | null;
    refractiveIndex: string;
    treatments: string[];
}): { total: number; breakdown: { label: string; value: number }[] } {
    const imgLens = LENS_TYPES.find((l) => l.id === selections.lensType);
    let basePrice = imgLens?.price ?? 150;

    const breakdown: { label: string; value: number }[] = [];
    // Base Lens Price Logic
    if (imgLens && selections.lensType === "multifocal") {
        // For Multifocal, the price is determined by the Vision Field selection
        if (selections.visionField) {
            const fieldOption = VISION_FIELDS.find((v) => v.id === selections.visionField);
            if (fieldOption) {
                basePrice = fieldOption.price;
                breakdown.push({ label: `Lente Multifocal ${fieldOption.label}`, value: basePrice });
            } else {
                // Fallback if no field selected yet (shouldn't happen in final calculation)
                basePrice = imgLens.price;
                breakdown.push({ label: imgLens.label, value: basePrice });
            }
        } else {
            basePrice = imgLens.price;
            breakdown.push({ label: imgLens.label, value: basePrice });
        }
    } else {
        // Monofocal
        breakdown.push({ label: imgLens?.label ?? "Lente", value: basePrice });
    }

    // Refractive index calculation
    const index = REFRACTIVE_INDICES.find((i) => i.id === selections.refractiveIndex);
    let indexPrice = 0;

    if (index) {
        if (selections.lensType === "monofocal" && index.monofocalPrice !== undefined) {
            // For Monofocal, the Index determines the base price of the visual solution
            // So we replace the "basePrice" (which was 150) with the Index Package Price?
            // User request: "Monofocal 1.50 = 159.90".
            // Previous logic had basePrice=150.
            // If we act as if 150 is valid, then 1.50 index wraps it? 
            // Most likely: Monofocal Price = Index Price. 
            // So we override basePrice or consider it the full price.

            // Let's reset basePrice to 0 and use index price fully, 
            // OR set basePrice to index.monofocalPrice and ignore default 150.

            // Removing the generic "Lente Monofocal" entry from breakdown if we are replacing it
            // Breakdown currently has: { label: "Monofocal", value: 150 } from top.

            // Cleanest way: modifying the top logic or adjusting here.
            // I'll adjust the 'breakdown' array by popping the generic one if it exists? 
            // Or better: update the Top Logic to know about Monofocal?

            // Let's stick to: Total = Base + Index. 
            // If Monofocal: Base=0, Index=159.90.
            // But 'calculateBudget' initialized basePrice from LENS_TYPES (150).

            // I will Subtract the initial basePrice and Add the new one.
            breakdown.shift(); // Remove the generic "Monofocal: 150"
            basePrice = 0;

            indexPrice = index.monofocalPrice;
            breakdown.push({ label: `Lente Monofocal + Índice ${index.label}`, value: indexPrice });
        } else {
            // Multifocal logic (Add-on)
            indexPrice = index.price;
            if (indexPrice > 0) {
                breakdown.push({ label: `Índice ${index.label}`, value: indexPrice });
            }
        }
    }

    // Treatments
    let treatmentTotal = 0;
    for (const tId of selections.treatments) {
        const treatment = TREATMENTS.find((t) => t.id === tId);
        if (treatment) {
            let price = treatment.price;
            let label = treatment.label;

            // Antirreflexo included in Multifocal
            if (selections.lensType === "multifocal" && tId === "antirreflexo") {
                price = 0;
                label = `${treatment.label} (Incluso)`;
            }

            breakdown.push({ label, value: price });
            treatmentTotal += price;
        }
    }

    const total = basePrice + (selections.lensType === "monofocal" ? indexPrice : (index?.price ?? 0)) + treatmentTotal;

    return { total, breakdown };
}
