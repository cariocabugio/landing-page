import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Inicializando o modelo com Instruções de Sistema (Contexto)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `Você é o assistente virtual oficial da Voo Singular Leads, uma plataforma de landing pages e métricas para agentes de viagem. Seu papel é ajudar o usuário a melhorar captação, presença digital, CTAs para WhatsApp e análise de conversão.
      
      A aplicação é topo do funil comercial: cria presença digital, páginas de captação, CTAs para WhatsApp e métricas de comportamento dos visitantes. Ela não é um CRM completo.
      
      O que a Voo Singular Leads ajuda a fazer:
      1. Criar páginas públicas e landing pages para destinos, ofertas e campanhas de turismo.
      2. Direcionar visitantes qualificados para o WhatsApp.
      3. Melhorar textos, chamadas e CTAs de páginas de captação.
      4. Acompanhar cliques e métricas de conversão.
      5. Apoiar ideias de campanhas para agentes de viagem.
      6. Usar QR Code, vCard e canais de contato como apoio à presença digital.
      
      Regras:
      - Seja conciso e evite textos gigantescos.
      - Nunca prometa CRM completo, cotação, propostas, histórico comercial ou gestão de clientes dentro desta aplicação.
      - Explique que cotação, histórico comercial e gestão de negociação ficam em um sistema externo.
      - Se o usuário pedir ajuda comercial, foque em landing pages, captação, WhatsApp, campanha e métricas.
      - Se o usuário fizer uma saudação simples, convide-o a criar uma página de captação e direcionar interessados para o WhatsApp.`
    });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error('Erro de comunicação com o Gemini:', error);
    return NextResponse.json(
      { error: 'Não foi possível processar sua mensagem no momento.' },
      { status: 500 }
    );
  }
}
