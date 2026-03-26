import React from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';

interface IntroPageProps {
  onStart: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Atmospheric Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-violet-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full text-center relative z-10"
      >
        <motion.div 
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="w-28 h-28 bg-gradient-to-br from-brand-primary to-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-brand-primary/40 mx-auto mb-10 relative"
        >
          <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] blur-xl" />
          <Calculator size={56} className="relative z-10" />
          <Sparkles size={24} className="absolute -top-3 -right-3 text-amber-300 animate-pulse" />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
          Commerce<br/><span className="text-brand-primary">Prime</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          The ultimate professional calculator suite for Class 12 Commerce. 
          Built for speed, accuracy, and deep conceptual understanding.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/20 dark:shadow-black/20">
            <Zap className="text-brand-primary mb-4 mx-auto" size={28} />
            <h3 className="font-bold text-base mb-1 text-zinc-900 dark:text-white">Ultra Fast</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Real-time calculations</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/20 dark:shadow-black/20">
            <Shield className="text-brand-primary mb-4 mx-auto" size={28} />
            <h3 className="font-bold text-base mb-1 text-zinc-900 dark:text-white">Reliable</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Curriculum aligned</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/20 dark:shadow-black/20">
            <Globe className="text-brand-primary mb-4 mx-auto" size={28} />
            <h3 className="font-bold text-base mb-1 text-zinc-900 dark:text-white">PWA Ready</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Works offline</p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold text-xl shadow-2xl hover:shadow-brand-primary/20 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 group-hover:text-white transition-colors">Enter Workspace</span>
          <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 group-hover:text-white transition-all" />
        </motion.button>
      </motion.div>

      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
          Professional Edition • v2.0.0
        </p>
      </footer>
    </div>
  );
};
