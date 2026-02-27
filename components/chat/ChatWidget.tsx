'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Olá! Eu sou o Vizzy, assistente virtual da Óticas Vizz. Como posso ajudar você hoje? 😊' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleSurveyState = (e: any) => {
            setIsBlocked(!!e.detail?.isOpen);
            if (e.detail?.isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("vizz_survey_state", handleSurveyState);
        return () => window.removeEventListener("vizz_survey_state", handleSurveyState);
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        } else {
            // Unfocus input when closing to help reset mobile keyboard/zoom
            inputRef.current?.blur();
        }
    }, [messages, isOpen, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                }),
            });

            const data = await response.json();

            if (data.choices?.[0]?.message) {
                setMessages((prev) => [...prev, {
                    role: 'assistant',
                    content: data.choices[0].message.content
                }]);
            } else {
                throw new Error('Resposta inválida da API');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: 'Ops! Tive um probleminha para processar sua mensagem. Poderia tentar novamente? Ou se preferir, chame no WhatsApp: (11) 2362-8799.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-24 sm:right-28 z-1000 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        className="absolute bottom-20 -right-16 sm:right-0 w-[320px] sm:w-[400px] h-[500px] max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(38,38,38,0.3)] border border-primary/5 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                                    <Bot size={22} className='text-primary' />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-secondary">Vizzy</h3>
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    </div>
                                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-2 rounded-xl transition-colors"
                                aria-label="Fechar chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area - Glass effect scroll */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/5">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-primary text-secondary' : 'bg-white text-primary border border-primary/5'
                                            }`}>
                                            {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-primary/5'
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-primary/5 shadow-sm flex items-center gap-3 text-gray-400">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Digitando...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-primary/5 flex gap-3 items-center">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Como posso ajudar?"
                                aria-label="Mensagem para o Vizzy"
                                className="flex-1 bg-secondary/5 border-none rounded-2xl px-5 py-3 text-base focus:ring-1 focus:ring-secondary transition-all outline-none text-gray-700"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                aria-label="Enviar mensagem"
                                className="bg-secondary text-primary p-3 rounded-2xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-secondary/20 flex items-center justify-center"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button - Dynamic visibility */}
            {!isBlocked && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
                    aria-expanded={isOpen}
                    className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 overflow-hidden ${isOpen ? 'bg-primary text-secondary translate-x-12 opacity-0 pointer-events-none' : 'bg-primary text-secondary'
                        }`}
                >
                    <div className="relative">
                        <MessageCircle size={28} className="text-secondary" />
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-secondary rounded-full border-2 border-primary"
                        />
                    </div>
                </motion.button>
            )}
        </div>
    );
}
