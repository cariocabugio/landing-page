'use client';

import { useState } from 'react';

// Tipagem rigorosa para manter a qualidade do TypeScript
type Message = {
  role: 'user' | 'ai';
  text: string;
};

export default function AssistantChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Atualiza a tela imediatamente com a mensagem do usuário
    const newMessages: Message[] = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Chama a nossa rota de backend criada no Passo 1
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await res.json();

      if (data.reply) {
        setMessages([...newMessages, { role: 'ai', text: data.reply }]);
      } else {
        throw new Error('Resposta vazia');
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', text: 'Desculpe, tive um problema ao conectar. Tente novamente!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-6">
      <div className="bg-blue-600 p-4 text-white font-bold text-center">
        🤖 Assistente Meus-Links-Pro
      </div>
      
      <div className="flex-col p-4 h-64 overflow-y-auto bg-gray-50 flex gap-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center my-auto">
            Envie uma mensagem para começar...
          </p>
        )}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-lg max-w-[80%] text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-100 text-blue-900 self-end rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none shadow-sm'
            }`}
          >
            {msg.text}
          </div>
        ))}
        
        {isLoading && (
          <div className="self-start bg-white border border-gray-200 text-gray-400 p-3 rounded-lg rounded-bl-none shadow-sm text-sm flex gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-colors text-sm"
          placeholder="Pergunte algo ao assistente..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-semibold"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}