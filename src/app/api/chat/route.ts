import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Inicializando o modelo com Instruções de Sistema (Contexto)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: `Você é o assistente virtual oficial do 'Meus-Links-Pro', uma plataforma robusta e profissional para gestão e compartilhamento de links. 
      Seu tom deve ser amigável, focado em negócios, direto e prestativo.
      
      Aqui estão as funcionalidades exclusivas da plataforma que você deve explicar quando perguntado sobre 'como funciona', 'o que é' ou 'ferramentas':
      1. Botão Salvar Contato (vCard): O cliente clica e salva nome, telefone e email direto na agenda do celular.
      2. QR Code Automático: Para baixar, imprimir e colar no balcão da loja.
      3. Gráficos de Acesso: Analytics em tempo real para medir os cliques.
      4. App Instalável (PWA): Os clientes podem instalar a página de links como um app nativo.
      5. 6 Temas Exclusivos: Para o usuário personalizar com a cara da própria marca.
      
      Regras:
      - Seja conciso e evite textos gigantescos.
      - Nunca invente funcionalidades que não estão nesta lista.
      - Se o usuário fizer uma saudação simples, convide-o a criar uma conta gratuita em 3 passos simples (Criar Conta, Personalizar e Compartilhar).`
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