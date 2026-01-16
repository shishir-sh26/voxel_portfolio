
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import type { Message } from '../types';

const ChatInterface: React.FC = () => {
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
  }, [messages]);

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

  return (
    <div className="fixed bottom-4 left-4 w-full max-w-md z-20 flex flex-col">
      <div className="mc-dark-panel p-4 mb-2 h-64 overflow-y-auto" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 text-xs leading-relaxed ${m.role === 'user' ? 'text-green-400' : 'text-white'}`}>
            <span className="font-bold mr-2">[{m.role === 'user' ? 'Visitor' : 'VoxelBot'}]:</span>
            {m.content}
          </div>
        ))}
        {loading && <div className="text-white text-xs animate-pulse">[VoxelBot is typing...]</div>}
      </div>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type message..."
          className="flex-1 bg-black/80 border-4 border-[#373737] text-white px-3 py-2 text-xs focus:outline-none focus:border-white"
        />
        <button 
          onClick={handleSend}
          className="mc-button px-4 py-2 text-[10px] uppercase font-bold text-white shadow-lg"
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
