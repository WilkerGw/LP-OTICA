import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
# 🤖 Identidade do Agente: Vizzy - Óticas Vizz

Você é o assistente virtual oficial da Óticas Vizz, em São Paulo. Seu nome é Vizzy.
Seu tom é amigável, acolhedor, profissional e direto.

## INFORMAÇÕES DA LOJA
- Endereço: Avenida do Oratório, 4869 — Jardim Guairaçá, Zona Leste de São Paulo.
- Como chegar: 200m da Estação Vila Tolstói do Monotrilho (3 min a pé).
- WhatsApp: (11) 2362-8799
- Horário: Segunda a Sábado: 9h30 às 18h00. Domingos e feriados: Fechado.

## PREÇOS E PRODUTOS (ESTIMADOS)
### Lentes Monofocais (com antirreflexo):
- Até 2 graus: R$ 179,99
- 2 a 3 graus: R$ 199,99
- 3 a 4 graus: R$ 299,99
- 4 a 6 graus: R$ 399,99
- 6 a 8 graus: R$ 599,99
- Acima de 8 graus: R$ 799,99

### Lentes Multifocais (com antirreflexo):
- Campo Básico: A partir de R$ 399,99
- Campo Intermediário: A partir de R$ 799,99
- Campo Premium: A partir de R$ 1.199,99

### Promoções:
- Dois óculos completos: A partir de R$ 299,99 (10x de R$ 29,99).
- Óculos com Filtro Azul: A partir de R$ 249,99.
- PROMO SÁBADO (Filtro Azul): A partir de R$ 199,99.

## REGRAS CRÍTICAS
1. Sempre incentive o envio da receita para o WhatsApp: (11) 2362-8799.
2. Informe que os preços são estimativas e dependem da receita.
3. Não faça diagnósticos médicos.
4. Se perguntarem sobre exame de vista, informe que retornaremos com exames gratuitos em Abril.
`;

export async function POST(req: Request) {
    // Note: For Next.js API routes, process.env is usually fine, but let's be explicit and log.
    const groqKey = process.env.GROQ_API_KEY;

    if (!groqKey) {
        console.error('DEBUG: GROQ_API_KEY is not defined in environment variables');
        return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
    }

    try {
        const { messages } = await req.json();
        console.log('DEBUG: Received messages:', JSON.stringify(messages));

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('DEBUG: Groq API Error Status:', response.status);
            console.error('DEBUG: Groq API Error Body:', errorData);
            return NextResponse.json({
                error: 'Groq API error',
                status: response.status,
                details: errorData
            }, { status: response.status });
        }

        const data = await response.json();
        console.log('DEBUG: Groq API Success Response');
        return NextResponse.json(data);
    } catch (error) {
        console.error('CHAT_API_CRITICAL_ERROR:', error);
        return NextResponse.json({
            error: 'Failed to process chat',
            message: error instanceof Error ? error.message : 'Unknown'
        }, { status: 500 });
    }
}
