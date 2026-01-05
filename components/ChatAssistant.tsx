
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Loader2, Sparkles, HelpCircle } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a Flora 🌿. Precisa de ajuda para escolher a lembrancinha ideal ou gostaria de tirar dúvidas sobre o kit plantio?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    
    // Add user message
    const newHistory: ChatMessage[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newHistory);
    setIsLoading(true);

    // Call API
    const response = await chatWithAssistant(newHistory, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-stone-200 mb-4 overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 flex flex-col max-h-[500px]">
          
          {/* Chat Header */}
          <div className="bg-purple-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Flora (IA)</h3>
                <p className="text-xs text-purple-100">Consultora MyPlant</p>
              </div>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors"><Minimize2 className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-3 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-sm relative ${
                    msg.role === 'user' 
                    ? 'bg-purple-100 text-purple-900' 
                    : 'bg-white text-stone-800 border border-stone-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2 border border-stone-100">
                    <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                    <span className="text-xs text-stone-400">Digitando...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Pergunte sobre plantas..."
              className="flex-1 bg-stone-50 border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg shadow-purple-200 transition-all hover:scale-105 flex items-center gap-2 group"
      >
        {isOpen ? (
            <X className="w-6 h-6" />
        ) : (
            <HelpCircle className="w-6 h-6" />
        )}
        {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium pr-1">Tire suas dúvidas</span>}
      </button>
    </div>
  );
};
