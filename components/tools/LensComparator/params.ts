export interface RefractiveIndex {
    value: number;
    label: string;
    material: string;
    features: string[];
    image: string;
}

export const REFRACTIVE_INDICES: RefractiveIndex[] = [
    {
        value: 1.50,
        label: "1.50 Standard",
        material: "CR-39",
        features: ["Economia", "Boa ótica", "Mais espessa", "Não recomendada para graus altos"],
        image: "/images/1.50.webp",
    },
    {
        value: 1.56,
        label: "1.56 Mid-Index",
        material: "Resina",
        features: ["Levemente mais fina (+15%)", "Proteção UV básica", "Bom custo-benefício"],
        image: "/images/1.56.webp",
    },
    {
        value: 1.59,
        label: "1.59 Polycarbonate",
        material: "Policarbonato",
        features: ["Resistente a impacto", "Mais leve", "Ideal para crianças/esportes"],
        image: "/images/1.59.webp",
    },
    {
        value: 1.67,
        label: "1.67 High-Index",
        material: "Resina de Alto Índice",
        features: ["Fina e estética (+20%)", "Ótima para graus médios/altos", "Proteção UV total"],
        image: "/images/1.67.webp",
    },
    {
        value: 1.74,
        label: "1.74 Ultra High-Index",
        material: "Resina Ultra Fina",
        features: ["A mais fina disponível (+35%)", "Estética superior", "Ideal para graus muito altos"],
        image: "/images/1.74.webp",
    },
];

// Calculation Constants
const BASE_THICKNESS = 10; // Base visual unit
const THICKNESS_FACTOR = 2.5; // Multiplier for visual difference (Reduced from 4)
const MIN_CENTER_THICKNESS = 1.5; // Safety minimum for center (plus lenses)
const MIN_EDGE_THICKNESS = 1.5; // Safety minimum for edge (minus lenses)

/**
 * Calculates simulated lens thickness for visualization.
 * Returns relative units, not exact millimeters.
 */
export const calculateThickness = (degree: number, index: number) => {
    const absDegree = Math.abs(degree);

    // Refractive index effect: Higher index = smaller divisor = smaller result? 
    // No, we want Higher Index -> Thinner.
    // Thickness ~ Degree / (Index - 1)
    // Standard (1.50): Degree / 0.5 = 2 * Degree
    // High (1.74): Degree / 0.74 = 1.35 * Degree ( ~32% thinner)

    const materialFactor = 1 / (index - 1);
    const baseThickness = absDegree * materialFactor * THICKNESS_FACTOR; // Adjusted for visual scaling

    if (degree === 0) {
        return { edge: MIN_EDGE_THICKNESS, center: MIN_CENTER_THICKNESS };
    }

    if (degree < 0) {
        // Myopia (Concave): Edge is thick, Center is thin
        return {
            edge: MIN_EDGE_THICKNESS + baseThickness,
            center: MIN_CENTER_THICKNESS,
        };
    } else {
        // Hyperopia (Convex): Center is thick, Edge is thin
        return {
            edge: MIN_EDGE_THICKNESS,
            center: MIN_CENTER_THICKNESS + baseThickness,
        };
    }
};
