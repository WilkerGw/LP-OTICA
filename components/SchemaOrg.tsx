export function SchemaOrg() {
    const localBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.oticasvizz.com.br",
        name: "Óticas Vizz",
        description:
            "Ótica premium na Zona Leste de São Paulo. Armações, lentes multifocais, tratamentos e exame de vista.",
        url: "https://www.oticasvizz.com.br",
        telephone: "+55-11-2362-8799",
        email: "oticasvizz@gmail.com",
        image: "https://www.oticasvizz.com.br/images/logo.webp",
        priceRange: "$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Avenida do Oratório, 4869",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            postalCode: "03310-000",
            addressCountry: "BR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -23.5698,
            longitude: -46.5372,
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            opens: "09:30",
            closes: "18:00",
        },
        sameAs: [],
        hasMap:
            "https://www.google.com/maps/dir/?api=1&destination=Av.+do+Oratório,+4869",
        currenciesAccepted: "BRL",
        paymentAccepted: "Cash, Credit Card, PIX",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "47",
            bestRating: "5",
        },
    };

    const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "A Óticas Vizz realiza exame de vista?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim! Contamos com equipamentos modernos para exame de vista completo. Agende pelo WhatsApp ou venha diretamente à nossa loja na Av. do Oratório, 4869, Zona Leste de SP.",
                },
            },
            {
                "@type": "Question",
                name: "Qual o prazo para ficar pronto meu óculos?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "O prazo varia conforme o tipo de lente. Lentes monofocais simples ficam prontas em até 3 dias úteis. Lentes multifocais premium podem levar até 7 dias úteis.",
                },
            },
            {
                "@type": "Question",
                name: "Vocês aceitam convênio?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Trabalhamos com os principais convênios ópticos. Entre em contato pelo WhatsApp para verificar se o seu plano é aceito.",
                },
            },
            {
                "@type": "Question",
                name: "Posso parcelar meus óculos?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim! Parcelamos em até 12x sem juros no cartão de crédito. Pagamentos à vista no PIX têm 10% de desconto.",
                },
            },
            {
                "@type": "Question",
                name: "O que são lentes multifocais?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Lentes multifocais substituem dois ou mais pares de óculos em um único, permitindo enxergar bem de longe, de perto e a distâncias intermediárias. São ideais para quem tem presbiopia (vista cansada).",
                },
            },
            {
                "@type": "Question",
                name: "Qual a diferença entre lentes com e sem antirreflexo?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "O tratamento antirreflexo elimina reflexos indesejados causados por telas, faróis e iluminação artificial, melhorando muito a nitidez e o conforto visual, especialmente à noite.",
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
            />
        </>
    );
}
