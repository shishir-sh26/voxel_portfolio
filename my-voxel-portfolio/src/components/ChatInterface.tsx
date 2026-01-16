
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import type { Message } from '../types';

const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to my voxel world! Ask me anything about my projects.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }]
    }));

    const response = await gemini.chat(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="mc-button w-12 h-12 flex items-center justify-center text-white text-xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)]"
          title="Open AI Guide"
        >
          ?
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-full max-w-[320px] sm:max-w-md z-50 flex flex-col pointer-events-auto animate-in slide-in-from-left duration-300">
      <div className="mc-panel p-0 bg-[#c6c6c6] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#373737] p-3 flex justify-between items-center border-b-4 border-black">
          <span className="text-[10px] text-white font-bold uppercase">_GUIDE_BOT_</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-500 font-bold px-2 text-[12px]"
          >
            X
          </button>
        </div>

        {/* Chat Area */}
        <div className="bg-black/90 p-4 h-64 overflow-y-auto no-scrollbar scroll-smooth" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 text-[8px] leading-tight ${m.role === 'user' ? 'text-green-400' : 'text-white'}`}>
              <span className="font-bold mr-2">[{m.role === 'user' ? 'VISITOR' : 'BOT'}]:</span>
              {m.content}
            </div>
          ))}
          {loading && <div className="text-white text-[8px] animate-pulse">[_TYPING_]</div>}
        </div>
        
        {/* Input Area */}
        <div className="p-3 bg-gray-400 border-t-4 border-black flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="CHAT_HERE"
            className="flex-1 bg-black text-white px-3 py-2 text-[8px] focus:outline-none border-2 border-white uppercase"
          />
          <button 
            onClick={handleSend}
            className="mc-button-sm px-4 py-2 text-[8px] font-bold text-white"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
