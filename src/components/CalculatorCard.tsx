import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface CalculatorCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ 
  title, 
  description, 
  children, 
  icon,
  className 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn(
        "glass rounded-2xl p-6 mb-6 transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4 className="text-xl font-bold tracking-tight mb-1">{title}</h4>
          {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
};

interface ResultDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  label, 
  value, 
  unit, 
  highlight = false 
}) => {
  return (
    <div className={cn(
      "p-5 md:p-6 rounded-[2rem] flex flex-col gap-2 relative overflow-hidden transition-all duration-300",
      highlight 
        ? "bg-gradient-to-br from-brand-primary/10 to-indigo-500/10 border border-brand-primary/20 shadow-sm" 
        : "bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50"
    )}>
      {highlight && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-indigo-500" />
      )}
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <div className="flex items-baseline flex-wrap gap-1.5">
        <span className={cn(
          "text-3xl sm:text-4xl font-black tracking-tighter break-all sm:break-normal",
          highlight ? "text-brand-primary" : "text-zinc-900 dark:text-white"
        )}>
          {value}
        </span>
        {unit && <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">{unit}</span>}
      </div>
    </div>
  );
};
