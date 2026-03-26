import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ValidatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error: externalError,
  className
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (externalError) {
      setError(externalError);
    } else if (isDirty) {
      if (value && isNaN(Number(value))) {
        setError('Please enter a valid number');
      } else {
        setError(null);
      }
    }
  }, [value, externalError, isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIsDirty(true);
    onChange(val);
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <label className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 ml-1">
        {label}
      </label>
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full px-5 py-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/80 outline-none transition-all duration-300 border-2 shadow-sm focus:shadow-md font-medium text-lg",
            error 
              ? "border-red-500/50 focus:border-red-500 bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400" 
              : "border-transparent focus:border-brand-primary/40 focus:bg-white dark:focus:bg-zinc-900 group-hover:bg-zinc-200/50 dark:group-hover:bg-zinc-700/50"
          )}
        />
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
            >
              <AlertCircle size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[11px] font-bold text-red-500 ml-1"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
