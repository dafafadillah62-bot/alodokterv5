import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, User, Bot, X, Loader2, Stethoscope, Check, CheckCheck } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Doctor } from '../App';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
}

export default function DoctorChat({ isOpen, onClose, selectedDoctor }: { 
  isOpen: boolean; 
  onClose: () => void;
  selectedDoctor: Doctor | null;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset chat when doctor changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const initialText = selectedDoctor 
        ? `Halo! Saya ${selectedDoctor.name}, ${selectedDoctor.specialty}. Ada yang bisa saya bantu terkait keluhan Anda hari ini?`
        : 'Halo! Saya asisten AI Alodokter. Ada yang bisa saya bantu hari ini? Silakan ceritakan keluhan kesehatan Anda.';
      
      setMessages([{ role: 'model', text: initialText, timestamp: new Date(), status: 'read' }]);
    }
  }, [isOpen, selectedDoctor]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const timestamp = new Date();
    setInput('');
    
    // Add user message with 'sending' status
    setMessages(prev => [...prev, { role: 'user', text: userMessage, timestamp, status: 'sending' }]);
    
    // Simulate 'sent' after a tiny delay
    setTimeout(() => {
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 && msg.role === 'user' ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);

    setIsLoading(true);

    try {
      const systemInstruction = selectedDoctor
        ? `Anda adalah ${selectedDoctor.name}, seorang ${selectedDoctor.specialty} di ${selectedDoctor.hospital}. Berikan saran kesehatan yang ramah, profesional, dan informatif sesuai dengan spesialisasi Anda dalam Bahasa Indonesia. Selalu ingatkan pengguna bahwa saran ini bukan pengganti diagnosis medis profesional dan sarankan untuk pemeriksaan fisik langsung jika diperlukan.`
        : "Anda adalah asisten medis AI untuk Alodokter. Berikan saran kesehatan yang ramah, profesional, dan informatif dalam Bahasa Indonesia. Selalu ingatkan pengguna bahwa saran ini bukan pengganti diagnosis medis profesional dan sarankan untuk berkonsultasi dengan dokter nyata jika gejala berlanjut atau parah.";

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      
      // Mark user message as 'read' when AI starts responding
      setMessages(prev => prev.map(msg => 
        msg.role === 'user' && msg.status === 'sent' ? { ...msg, status: 'read' } : msg
      ));

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text || "Maaf, saya mengalami kendala teknis.", 
        timestamp: new Date(),
        status: 'read'
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Maaf, sepertinya ada masalah koneksi. Coba lagi nanti.", 
        timestamp: new Date(),
        status: 'read'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-6 right-6 w-full max-w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {selectedDoctor ? (
                  <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Bot size={24} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm truncate max-w-[200px]">
                  {selectedDoctor ? selectedDoctor.name : "AI Doctor Assistant"}
                </h3>
                <p className="text-[10px] text-blue-100">
                  {selectedDoctor ? selectedDoctor.specialty : "Online • Siap membantu"}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col w-full", msg.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn(
                  "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed relative group",
                  msg.role === 'user' 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-md" 
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm"
                )}>
                  <div className="markdown-body">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                  
                  {/* Message Info (Time & Status) */}
                  <div className={cn(
                    "flex items-center gap-1 mt-1 text-[10px]",
                    msg.role === 'user' ? "text-blue-100 justify-end" : "text-gray-400 justify-start"
                  )}>
                    <span>{formatTime(msg.timestamp)}</span>
                    {msg.role === 'user' && (
                      <span>
                        {msg.status === 'sending' && <Loader2 size={10} className="animate-spin" />}
                        {msg.status === 'sent' && <Check size={10} />}
                        {msg.status === 'read' && <CheckCheck size={10} className="text-blue-200" />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Improved Typing Indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex justify-start items-end gap-2"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex items-center gap-1">
                    <motion.span 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    />
                    <motion.span 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    />
                    <motion.span 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tulis keluhan Anda di sini..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              AI dapat memberikan informasi yang tidak akurat. Konsultasikan dengan dokter.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
