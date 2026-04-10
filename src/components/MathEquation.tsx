import React from 'react';
import { cn } from '../lib/utils';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface MathEquationProps {
  formula: string;
  className?: string;
}

export const MathEquation: React.FC<MathEquationProps> = ({ formula, className }) => {
  return (
    <div className={cn("w-full flex items-center justify-center py-4 px-1 sm:px-2 overflow-x-auto custom-scrollbar", className)}>
      <div className="min-w-fit text-center text-[clamp(0.55rem,2.5vw,1.25rem)] sm:text-[clamp(0.8rem,2.5vw,1.5rem)] font-medium leading-relaxed px-2">
        <InlineMath math={`\\displaystyle ${formula}`} />
      </div>
    </div>
  );
};
