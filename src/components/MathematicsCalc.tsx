import React, { useState } from 'react';
import { CalculatorRoom } from './CalculatorRoom';
import { ResultDisplay } from './CalculatorCard';
import { ValidatedInput } from './ValidatedInput';

interface Props {
  activeId: string | null;
  onClose: () => void;
}

const MathematicsCalc: React.FC<Props> = ({ activeId, onClose }) => {
  const [financial, setFinancial] = useState({ principal: '', rate: '', time: '', n: '12' });
  const [stats, setStats] = useState('');
  const [annuity, setAnnuity] = useState({ pmt: '', rate: '', time: '' });
  const [prob, setProb] = useState({ favorable: '', total: '' });

  const handleInputChange = (setter: any, field: string, value: string) => {
    setter((prev: any) => ({ ...prev, [field]: value }));
  };

  // Statistics Calculations
  const calculateStats = () => {
    const arr = stats.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (arr.length === 0) return { mean: '0', median: '0', mode: '0', sd: '0' };
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
    return { mean: mean.toFixed(2), median: median.toFixed(2), sd: Math.sqrt(variance).toFixed(2) };
  };

  const statResults = calculateStats();

  return (
    <>
      {/* Financial Maths Room */}
      <CalculatorRoom 
        isOpen={activeId === 'financial'} 
        onClose={onClose} 
        title="Financial Mathematics"
        formula="\text{EMI} = \frac{P \times R \times (1+R)^N}{(1+R)^N - 1}"
        theory={`Financial Mathematics involves the application of mathematical methods to financial problems.

- Equated Monthly Installment (EMI): A fixed payment amount made by a borrower to a lender at a specified date each calendar month.
- Principal (P): The initial amount of the loan.
- Rate (R): Periodic interest rate.
- Time (N): Number of periodic payments.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Principal Amount" value={financial.principal} onChange={(v) => handleInputChange(setFinancial, 'principal', v)} placeholder="₹" />
          <ValidatedInput label="Annual Rate (%)" value={financial.rate} onChange={(v) => handleInputChange(setFinancial, 'rate', v)} placeholder="%" />
          <div className="col-span-full">
            <ValidatedInput label="Time Period (Years)" value={financial.time} onChange={(v) => handleInputChange(setFinancial, 'time', v)} />
          </div>
        </div>
        <ResultDisplay label="Monthly EMI" value={( (parseFloat(financial.principal) * (parseFloat(financial.rate)/1200) * Math.pow(1+parseFloat(financial.rate)/1200, parseFloat(financial.time)*12)) / (Math.pow(1+parseFloat(financial.rate)/1200, parseFloat(financial.time)*12)-1) || 0).toFixed(2)} unit="₹" highlight />
      </CalculatorRoom>

      {/* Statistics Room */}
      <CalculatorRoom 
        isOpen={activeId === 'statistics'} 
        onClose={onClose} 
        title="Statistics"
        theory={`Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data.

- Mean: The average of a data set.
- Median: The middle value when a data set is ordered from least to greatest.
- Standard Deviation: A measure of the amount of variation or dispersion of a set of values.`}
      >
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1 block">Data Points (Comma Separated)</label>
          <textarea className="w-full px-6 py-4 rounded-[2rem] bg-zinc-100 dark:bg-zinc-800 outline-none min-h-[120px] border-2 border-transparent focus:border-brand-primary transition-all font-mono text-sm" value={stats} onChange={(e) => setStats(e.target.value)} placeholder="e.g. 10, 20, 30, 40, 50" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultDisplay label="Mean" value={statResults.mean} />
          <ResultDisplay label="Median" value={statResults.median} />
          <ResultDisplay label="Std Dev" value={statResults.sd} highlight />
        </div>
      </CalculatorRoom>

      {/* Annuity Room */}
      <CalculatorRoom 
        isOpen={activeId === 'annuity'} 
        onClose={onClose} 
        title="Annuity (FV/PV)"
        formula="\text{FV} = \text{PMT} \times \frac{(1+r)^n - 1}{r}"
        theory={`An annuity is a series of payments made at equal intervals.

- Future Value (FV): The value of a current asset at a future date based on an assumed rate of growth.
- Periodic Payment (PMT): The amount paid in each period.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Periodic Payment" value={annuity.pmt} onChange={(v) => handleInputChange(setAnnuity, 'pmt', v)} placeholder="₹" />
          <ValidatedInput label="Rate per Period (%)" value={annuity.rate} onChange={(v) => handleInputChange(setAnnuity, 'rate', v)} placeholder="%" />
          <div className="col-span-full">
            <ValidatedInput label="Number of Periods (n)" value={annuity.time} onChange={(v) => handleInputChange(setAnnuity, 'time', v)} />
          </div>
        </div>
        <ResultDisplay label="Future Value" value={(parseFloat(annuity.pmt) * (Math.pow(1 + parseFloat(annuity.rate)/100, parseFloat(annuity.time)) - 1) / (parseFloat(annuity.rate)/100) || 0).toFixed(2)} unit="₹" highlight />
      </CalculatorRoom>

      {/* Probability Room */}
      <CalculatorRoom 
        isOpen={activeId === 'probability'} 
        onClose={onClose} 
        title="Probability"
        formula="\text{P}(\text{A}) = \frac{n(\text{E})}{n(\text{S})}"
        theory={`Probability is a measure of the likelihood that an event will occur.

- Favorable Outcomes: The number of ways the event can happen.
- Total Outcomes: The total number of possible results.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Favorable Outcomes" value={prob.favorable} onChange={(v) => handleInputChange(setProb, 'favorable', v)} />
          <ValidatedInput label="Total Outcomes" value={prob.total} onChange={(v) => handleInputChange(setProb, 'total', v)} />
        </div>
        <ResultDisplay label="Probability P(A)" value={(parseFloat(prob.favorable) / parseFloat(prob.total) || 0).toFixed(4)} highlight />
      </CalculatorRoom>
    </>
  );
};

export default MathematicsCalc;
