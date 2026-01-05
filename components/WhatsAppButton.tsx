import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, Phone, Minimize2 } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{from: 'agent'|'user', text: string}[]>([
      { from: 'agent', text: 'Olá! Sou a Leona. Seja bem-vindo(a) à MyPlant! 🌱' },
      { from: 'agent', text: 'Estou online. Como posso ajudar com seu pedido personalizado hoje?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Imagem da Leona
  const agentImage = "https://i.ibb.co/DDYjtxbj/E-quinta-feira-teremos-lan-amento-de-uma-super-novidade-no-suculentasmyplant-Quero-s-ver.jpg";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
      if (!input.trim()) return;
      
      const userText = input;
      setInput('');
      setMessages(prev => [...prev, { from: 'user', text: userText }]);

      // Resposta automática simulada
      setTimeout(() => {
          setMessages(prev => [...prev, { 
              from: 'agent', 
              text: 'Que ótimo! Para agilizar nosso atendimento e eu te mandar fotos dos modelos, me chama no WhatsApp clicando no botão abaixo? 👇' 
          }]);
      }, 1000);
  };

  const openWhatsApp = () => {
      const phoneNumber = "5527999279902"; 
      const message = encodeURIComponent("Olá Leona! Vim pelo chat do site.");
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Janela do Chat */}
      {isOpen && (
          <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-stone-200 mb-4 overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 flex flex-col max-h-[500px]">
              
              {/* Header */}
              <div className="bg-[#075E54] p-4 flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                      <div className="relative">
                          <img src={agentImage} alt="Leona" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full"></span>
                      </div>
                      <div>
                          <h3 className="font-bold text-sm">Leona Pacheco</h3>
                          <p className="text-xs text-green-100">Online agora</p>
                      </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors"><Minimize2 className="w-4 h-4" /></button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#E5DDD5] space-y-3 min-h-[300px] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
                  {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-2.5 rounded-lg text-sm shadow-sm ${msg.from === 'user' ? 'bg-[#DCF8C6] text-stone-800' : 'bg-white text-stone-800'}`}>
                              {msg.text}
                          </div>
                      </div>
                  ))}
                  
                  {/* Botão de Ação CTA */}
                  {messages.length > 2 && (
                      <div className="flex justify-center mt-4">
                          <button 
                              onClick={openWhatsApp}
                              className="bg-[#25D366] hover:bg-[#1ebd56] text-white px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 transition-transform hover:scale-105"
                          >
                              <MessageCircle className="w-4 h-4" /> Continuar no WhatsApp
                          </button>
                      </div>
                  )}
                  <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-[#f0f2f5] border-t border-stone-200 flex gap-2">
                  <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Escreva uma mensagem..."
                      className="flex-1 bg-white border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-0 shadow-sm"
                  />
                  <button 
                      onClick={handleSend}
                      className="bg-[#00a884] text-white p-2 rounded-full hover:bg-[#008f6f] transition-colors flex items-center justify-center"
                  >
                      <Send className="w-4 h-4" />
                  </button>
              </div>
          </div>
      )}

      {/* Botão Flutuante (Avatar) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center"
      >
        {isOpen ? (
            <div className="bg-stone-600 text-white p-3 rounded-full shadow-lg hover:bg-stone-700 transition-colors">
                <X className="w-6 h-6" />
            </div>
        ) : (
            <div className="relative">
                 <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#25D366] shadow-xl hover:scale-105 transition-transform duration-300">
                    <img src={agentImage} alt="Falar com Leona" className="w-full h-full object-cover" />
                 </div>
                 {/* Status Badge */}
                 <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#25D366] border-2 border-white rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-white" />
                 </div>
                 {/* Tooltip */}
                 <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-md border border-stone-100 text-sm font-bold text-stone-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                     Falar com a Leona
                 </div>
            </div>
        )}
      </button>
    </div>
  );
};