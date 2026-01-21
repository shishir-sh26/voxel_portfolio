import React, { useState, useRef, useEffect } from 'react';
import { CHAT_TREE } from '../constants'; // Import the new tree
import type { Message } from '../types';

const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState('start');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: CHAT_TREE.start.message }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleOptionSelect = (label: string, nextKey: string) => {
    // 1. Add User's "choice" to the chat history
    setMessages(prev => [...prev, { role: 'user', content: label }]);

    // 2. Small delay to make it feel like the bot is "thinking"
    setTimeout(() => {
      const nextData = CHAT_TREE[nextKey];
      setMessages(prev => [...prev, { role: 'assistant', content: nextData.message }]);
      setCurrentNode(nextKey);
    }, 400);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="mc-button w-12 h-12 flex items-center justify-center text-white text-xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)]"
          title="Open Guide"
        >
          ?
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-full max-w-[320px] sm:max-w-md z-50 flex flex-col pointer-events-auto animate-in slide-in-from-left duration-300">
      <div className="mc-panel p-0 bg-[#c6c6c6] overflow-hidden flex flex-col shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="bg-[#373737] p-3 flex justify-between items-center border-b-4 border-black">
          <span className="text-[10px] text-white font-bold uppercase tracking-widest">_VOXEL_GUIDE_</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-500 font-bold px-2 text-[12px]"
          >
            X
          </button>
        </div>

        {/* Chat Area */}
        <div className="bg-black/90 p-4 h-72 overflow-y-auto no-scrollbar scroll-smooth" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`mb-4 text-[9px] leading-relaxed ${m.role === 'user' ? 'text-green-400' : 'text-white'}`}>
              <span className="font-bold mr-2">[{m.role === 'user' ? 'PLAYER' : 'GUIDE'}]:</span>
              {m.content}
            </div>
          ))}
        </div>
        
        {/* Options Area (Replaces Input Area) */}
        <div className="p-3 bg-[#8b8b8b] border-t-4 border-black">
          <div className="grid grid-cols-1 gap-2">
            {CHAT_TREE[currentNode].options.map((opt, index) => (
              <button 
                key={index}
                onClick={() => handleOptionSelect(opt.label, opt.next)}
                className="mc-button-sm w-full py-2 text-[8px] font-bold text-white uppercase text-center hover:bg-[#5a5a5a] transition-all"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatInterface;