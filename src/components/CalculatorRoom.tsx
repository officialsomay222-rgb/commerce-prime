import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, Calculator } from 'lucide-react';
import { cn } from '../lib/utils';
import { MathEquation } from './MathEquation';

interface CalculatorRoomProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  formula?: string;
  theory?: string;
  children: React.ReactNode;
}

export const CalculatorRoom: React.FC<CalculatorRoomProps> = ({
  isOpen,
  onClose,
  title,
  description,
  formula,
  theory,
  children
}) => {
  const [activeTab, setActiveTab] = React.useState<'calc' | 'theory'>('calc');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md"
        >
          {/* Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            className="relative w-full h-full md:w-[95vw] md:h-[95vh] md:rounded-[3rem] overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl z-20">
              <div className="flex-1">
                <h3 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-brand-primary via-indigo-500 to-violet-600 bg-clip-text text-transparent leading-none">
                  {title}
                </h3>
                {description && <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 mt-2 uppercase tracking-[0.3em]">{description}</p>}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl shadow-inner">
                  <button 
                    onClick={() => setActiveTab('calc')}
                    className={cn(
                      "px-8 py-2.5 rounded-xl text-sm font-black transition-all uppercase tracking-widest",
                      activeTab === 'calc' ? "bg-white dark:bg-zinc-700 shadow-md text-brand-primary" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    )}
                  >
                    Calculator
                  </button>
                  <button 
                    onClick={() => setActiveTab('theory')}
                    className={cn(
                      "px-8 py-2.5 rounded-xl text-sm font-black transition-all uppercase tracking-widest",
                      activeTab === 'theory' ? "bg-white dark:bg-zinc-700 shadow-md text-brand-primary" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    )}
                  >
                    Theory
                  </button>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all shadow-sm"
                >
                  <X size={28} />
                </motion.button>
              </div>
            </div>
            
            {/* Mobile Tabs */}
            <div className="md:hidden flex border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <button 
                onClick={() => setActiveTab('calc')}
                className={cn(
                  "flex-1 py-5 text-xs font-black uppercase tracking-[0.2em] border-b-2 transition-all",
                  activeTab === 'calc' ? "border-brand-primary text-brand-primary bg-white dark:bg-zinc-800" : "border-transparent text-zinc-500"
                )}
              >
                Calculator
              </button>
              <button 
                onClick={() => setActiveTab('theory')}
                className={cn(
                  "flex-1 py-5 text-xs font-black uppercase tracking-[0.2em] border-b-2 transition-all",
                  activeTab === 'theory' ? "border-brand-primary text-brand-primary bg-white dark:bg-zinc-800" : "border-transparent text-zinc-500"
                )}
              >
                Theory
              </button>
            </div>
            
            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
              
              <AnimatePresence mode="wait">
                {activeTab === 'calc' ? (
                  <motion.div
                    key="calc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-12"
                  >
                    {formula && (
                      <div className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-800/50 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700/50 flex flex-col sm:flex-row gap-8 md:gap-10 relative overflow-hidden group shadow-xl shadow-zinc-200/20 dark:shadow-black/20">
                        <div className="absolute -right-12 -bottom-12 opacity-[0.05] dark:opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 rotate-12">
                          <Calculator size={240} />
                        </div>
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 shadow-inner border border-brand-primary/20">
                          <Info size={32} />
                        </div>
                        <div className="relative z-10 flex-1 min-w-0">
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary/80 mb-4 block">Curriculum Standard Formula</span>
                          <div className="bg-white/80 dark:bg-zinc-950/50 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-inner border border-zinc-100 dark:border-zinc-800/50">
                            <MathEquation formula={formula} className="text-zinc-900 dark:text-zinc-100" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-12 pb-20">
                      {children}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="theory"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="max-w-3xl mx-auto py-8"
                  >
                    <div className="prose dark:prose-invert prose-zinc max-w-none">
                      <h2 className="text-5xl font-black tracking-tighter mb-10">Theoretical Concept</h2>
                      <div className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-8 whitespace-pre-wrap font-serif bg-white dark:bg-zinc-800/30 p-12 md:p-16 rounded-[4rem] border border-zinc-100 dark:border-zinc-700/50 shadow-2xl shadow-zinc-200/20 dark:shadow-black/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary/20" />
                        {theory || "No theoretical explanation available for this calculator yet. Please refer to your standard textbook for detailed concepts."}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
