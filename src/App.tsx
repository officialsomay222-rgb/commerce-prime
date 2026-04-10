/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  BookOpen, 
  TrendingUp, 
  PieChart, 
  Moon, 
  Sun, 
  ChevronRight,
  ArrowRight,
  LayoutGrid,
  Zap,
  Activity,
  BarChart3,
  Scale,
  Users,
  TrendingDown,
  Percent,
  Landmark,
  Sigma,
  Briefcase,
  DollarSign,
  Coins,
  FileText,
  UserPlus,
  RefreshCcw
} from 'lucide-react';
import { cn } from './lib/utils';
import { Subject } from './types';

// Subject Components
import AccountancyCalc from './components/AccountancyCalc';
import EconomicsCalc from './components/EconomicsCalc';
import MathematicsCalc from './components/MathematicsCalc';
import BusinessStudiesCalc from './components/BusinessStudiesCalc';

interface CalcItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

import { IntroPage } from './components/IntroPage';

export default function App() {
  const [activeSubject, setActiveSubject] = useState<Subject>('Accountancy');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCalc, setSelectedCalc] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (showIntro) {
    return <IntroPage onStart={() => setShowIntro(false)} />;
  }

  const subjects: { id: Subject; icon: React.ReactNode; color: string }[] = [
    { id: 'Accountancy', icon: <BookOpen size={20} />, color: 'bg-blue-500' },
    { id: 'Economics', icon: <TrendingUp size={20} />, color: 'bg-emerald-500' },
    { id: 'Mathematics', icon: <Calculator size={20} />, color: 'bg-indigo-500' },
    { id: 'Business Studies', icon: <PieChart size={20} />, color: 'bg-orange-500' },
    { id: 'AI Loki', icon: <Activity size={20} />, color: 'bg-brand-primary' },
  ];

  const calculators: Record<Subject, CalcItem[]> = {
    'AI Loki': [],
    'Accountancy': [
      { id: 'ratios', title: 'Ratio Analysis', description: 'Liquidity, Solvency & Profitability', icon: <Scale size={20} />, color: 'bg-blue-500' },
      { id: 'partnership', title: 'Partnership Basics', description: 'Interest on Capital & Drawings', icon: <Users size={20} />, color: 'bg-cyan-500' },
      { id: 'goodwill', title: 'Goodwill Valuation', description: 'Average & Super Profit Methods', icon: <Percent size={20} />, color: 'bg-indigo-500' },
      { id: 'depreciation', title: 'Depreciation', description: 'SLM & WDV Methods', icon: <TrendingDown size={20} />, color: 'bg-violet-500' },
      { id: 'npsr', title: 'NPSR & Sacrificing', description: 'New Profit Sharing Ratio', icon: <UserPlus size={20} />, color: 'bg-sky-500' },
      { id: 'shares', title: 'Issue of Shares', description: 'Pro-rata & Call calculations', icon: <Coins size={20} />, color: 'bg-blue-600' },
    ],
    'Economics': [
      { id: 'multiplier', title: 'Investment Multiplier', description: 'MPC, MPS & K-Multiplier', icon: <Zap size={20} />, color: 'bg-emerald-500' },
      { id: 'elasticity', title: 'Price Elasticity', description: 'Demand & Supply Elasticity', icon: <Activity size={20} />, color: 'bg-green-500' },
      { id: 'costs', title: 'Cost Analysis', description: 'TC, AC, AVC & MC', icon: <BarChart3 size={20} />, color: 'bg-teal-500' },
      { id: 'national-income', title: 'National Income', description: 'Value Added Method (GVAmp)', icon: <TrendingUp size={20} />, color: 'bg-emerald-600' },
      { id: 'consumption', title: 'Consumption Function', description: 'Propensity to Consume/Save', icon: <FileText size={20} />, color: 'bg-green-600' },
    ],
    'Mathematics': [
      { id: 'financial', title: 'Financial Maths', description: 'EMI, CAGR & Loan Tools', icon: <Landmark size={20} />, color: 'bg-indigo-500' },
      { id: 'statistics', title: 'Statistics', description: 'Mean, Median, Mode & SD', icon: <Sigma size={20} />, color: 'bg-blue-500' },
      { id: 'annuity', title: 'Annuity', description: 'Future & Present Value', icon: <Coins size={20} />, color: 'bg-indigo-600' },
      { id: 'probability', title: 'Probability', description: 'Basic & Bayes Theorem', icon: <PieChart size={20} />, color: 'bg-violet-500' },
    ],
    'Business Studies': [
      { id: 'roi', title: 'ROI Analysis', description: 'Return on Investment', icon: <Briefcase size={20} />, color: 'bg-orange-500' },
      { id: 'eps', title: 'Earnings Per Share', description: 'EPS & Financial Leverage', icon: <DollarSign size={20} />, color: 'bg-amber-500' },
      { id: 'working-capital', title: 'Working Capital', description: 'Requirement Estimation', icon: <RefreshCcw size={20} />, color: 'bg-orange-600' },
    ]
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-[100] mix-blend-overlay" />
      
      {/* Background Gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 bg-gradient-to-br from-brand-primary to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20"
          >
            <Calculator size={24} />
          </motion.div>
          <div>
            <h1 className="text-lg font-black tracking-tighter">Commerce Prime</h1>
            <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Class 12 Pro Suite</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {deferredPrompt && (
            <button 
              onClick={handleInstallClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all font-bold text-xs shadow-sm"
            >
              Install App
            </button>
          )}
          <a 
            href="https://loki-x-prime.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-all font-bold text-xs border border-brand-primary/20"
          >
            <Zap size={16} />
            Talk to AI Loki
          </a>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 pb-28 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <motion.span 
                  layoutId="indicator"
                  className={cn("w-3 h-3 rounded-full shadow-lg", subjects.find(s => s.id === activeSubject)?.color)}
                ></motion.span>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">{activeSubject}</h2>
              </div>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
                {activeSubject === 'Accountancy' && "Accounting & Ratios"}
                {activeSubject === 'Economics' && "Economic Analysis"}
                {activeSubject === 'Mathematics' && "Maths & Statistics"}
                {activeSubject === 'Business Studies' && "Financial Management"}
                {activeSubject === 'AI Loki' && "Commerce AI Expert"}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg font-medium leading-relaxed">
                {activeSubject === 'AI Loki' 
                  ? "Get instant answers to your commerce questions using our advanced AI Loki model."
                  : "Select a professional calculator below to open it in a dedicated workspace. All formulas follow standard CBSE/ICSE curriculum."}
              </p>
            </div>

            {activeSubject === 'AI Loki' ? (
              <div className="glass rounded-[4rem] p-8 md:p-20 text-center flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px] relative overflow-hidden group border-2 border-brand-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-brand-primary to-indigo-600 flex items-center justify-center text-white mb-10 shadow-2xl shadow-brand-primary/40 relative z-10 animate-float"
                >
                  <Activity size={64} />
                </motion.div>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 relative z-10">AI Loki Expert</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto mb-12 text-xl font-medium leading-relaxed relative z-10">
                  Get instant answers to your Accountancy, Economics, Business Studies, and Mathematics questions. Powered by Loki X Prime.
                </p>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://loki-x-prime.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-12 py-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black text-2xl hover:shadow-2xl hover:shadow-brand-primary/30 transition-all flex items-center gap-4 relative z-10 group/btn"
                >
                  Start Chatting <ChevronRight size={28} className="group-hover/btn:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators[activeSubject].map((calc, idx) => (
                  <motion.button
                    key={calc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    onClick={() => setSelectedCalc(calc.id)}
                    className="group relative glass rounded-[2.5rem] p-8 text-left hover:ring-2 hover:ring-brand-primary transition-all overflow-hidden shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform", calc.color)}>
                      {calc.icon}
                    </div>
                    <h4 className="text-xl font-black tracking-tight mb-2 group-hover:text-brand-primary transition-colors">{calc.title}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{calc.description}</p>
                    
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <ArrowRight size={20} className="text-brand-primary" />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Calculator Rooms (Modals) */}
      {activeSubject === 'Accountancy' && <AccountancyCalc activeId={selectedCalc} onClose={() => setSelectedCalc(null)} />}
      {activeSubject === 'Economics' && <EconomicsCalc activeId={selectedCalc} onClose={() => setSelectedCalc(null)} />}
      {activeSubject === 'Mathematics' && <MathematicsCalc activeId={selectedCalc} onClose={() => setSelectedCalc(null)} />}
      {activeSubject === 'Business Studies' && <BusinessStudiesCalc activeId={selectedCalc} onClose={() => setSelectedCalc(null)} />}

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 glass md:hidden px-4 py-4 flex justify-around items-center z-50 rounded-t-[2.5rem] border-t-2 border-white/20 dark:border-zinc-800/50">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => {
              setActiveSubject(subject.id);
              setSelectedCalc(null);
            }}
            className={cn(
              "relative flex flex-col items-center gap-1.5 p-2 transition-all duration-300",
              activeSubject === subject.id 
                ? "text-brand-primary scale-110" 
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            )}
          >
            {activeSubject === subject.id && (
              <motion.div 
                layoutId="nav-glow"
                className="absolute inset-0 bg-brand-primary/10 blur-xl rounded-full"
              />
            )}
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
              activeSubject === subject.id ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30" : "bg-transparent"
            )}>
              {subject.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">
              {subject.id === 'Business Studies' ? 'Business' : subject.id === 'AI Loki' ? 'AI' : subject.id.split(' ')[0]}
            </span>
          </button>
        ))}
      </nav>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => {
              setActiveSubject(subject.id);
              setSelectedCalc(null);
            }}
            className={cn(
              "group relative flex items-center justify-center w-16 h-16 rounded-[1.5rem] transition-all duration-500 shadow-xl",
              activeSubject === subject.id 
                ? "bg-brand-primary text-white scale-110 shadow-brand-primary/40 rotate-0" 
                : "bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:scale-105 -rotate-3 hover:rotate-0"
            )}
          >
            {activeSubject === subject.id && (
              <motion.div 
                layoutId="sidebar-glow"
                className="absolute inset-0 bg-brand-primary blur-2xl opacity-20 rounded-[1.5rem]"
              />
            )}
            {subject.icon}
            <span className="absolute left-full ml-6 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none shadow-2xl">
              {subject.id}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
