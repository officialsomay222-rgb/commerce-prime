export type Subject = 'Accountancy' | 'Economics' | 'Mathematics' | 'Business Studies' | 'AI Loki';

export interface CalculatorInfo {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface CalculatorResult {
  label: string;
  value: string | number;
  unit?: string;
}
