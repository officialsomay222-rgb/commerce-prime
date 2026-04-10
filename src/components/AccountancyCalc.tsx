import React, { useState } from 'react';
import { CalculatorRoom } from './CalculatorRoom';
import { ResultDisplay } from './CalculatorCard';
import { ValidatedInput } from './ValidatedInput';

interface Props {
  activeId: string | null;
  onClose: () => void;
}

const AccountancyCalc: React.FC<Props> = ({ activeId, onClose }) => {
  // Ratio Analysis State
  const [ratios, setRatios] = useState({ ca: '', cl: '', debt: '', equity: '', np: '', sales: '' });
  // Partnership State
  const [partnership, setPartnership] = useState({ capital: '', rate: '', drawings: '', period: '6.5' });
  // Goodwill State
  const [goodwill, setGoodwill] = useState({ p1: '', p2: '', p3: '', normalRate: '', capitalEmployed: '', years: '2' });
  // Depreciation State
  const [depr, setDepr] = useState({ cost: '', scrap: '', life: '', rate: '', years: '1' });
  // NPSR State
  const [npsr, setNpsr] = useState({ old1: '3', old2: '2', share: '1', type: 'simple' }); // 3:2 ratio, 1/5 share
  // Shares State
  const [shares, setShares] = useState({ applied: '', allotted: '', appMoney: '', totalShares: '' });

  const handleInputChange = (setter: any, field: string, value: string) => {
    setter((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Ratio Analysis Room */}
      <CalculatorRoom 
        isOpen={activeId === 'ratios'} 
        onClose={onClose} 
        title="Ratio Analysis"
        description="Liquidity, Solvency & Profitability"
        formula="\text{Current Ratio} = \frac{\text{Current Assets}}{\text{Current Liabilities}}"
        theory={`Ratio Analysis is a quantitative method of gaining insight into a company's liquidity, operational efficiency, and profitability by studying its financial statements.

1. Current Ratio: Measures a company's ability to pay short-term obligations. An ideal ratio is $2:1$.
2. Debt-to-Equity Ratio: Indicates the relative proportion of shareholders' equity and debt used to finance a company's assets. An ideal ratio is $2:1$.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Current Assets" value={ratios.ca} onChange={(v) => handleInputChange(setRatios, 'ca', v)} placeholder="₹" />
          <ValidatedInput label="Current Liabilities" value={ratios.cl} onChange={(v) => handleInputChange(setRatios, 'cl', v)} placeholder="₹" />
          <ValidatedInput label="Total Debt" value={ratios.debt} onChange={(v) => handleInputChange(setRatios, 'debt', v)} placeholder="₹" />
          <ValidatedInput label="Shareholders' Equity" value={ratios.equity} onChange={(v) => handleInputChange(setRatios, 'equity', v)} placeholder="₹" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultDisplay label="Current Ratio" value={(parseFloat(ratios.ca)/parseFloat(ratios.cl) || 0).toFixed(2)} unit=": 1" highlight />
          <ResultDisplay label="Debt-Equity" value={(parseFloat(ratios.debt)/parseFloat(ratios.equity) || 0).toFixed(2)} unit=": 1" />
        </div>
      </CalculatorRoom>

      {/* Partnership Room */}
      <CalculatorRoom 
        isOpen={activeId === 'partnership'} 
        onClose={onClose} 
        title="Partnership Basics"
        formula="\text{Interest on Drawings} = \text{Total Drawings} \times \frac{\text{Rate}}{100} \times \frac{\text{Average Period}}{12}"
        theory={`Interest on drawings is charged by the firm from the partners on the amount withdrawn by them for personal use.

Average Period Calculation:
- Beginning of every month: $6.5$ months
- Middle of every month: $6$ months
- End of every month: $5.5$ months`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Total Drawings" value={partnership.drawings} onChange={(v) => handleInputChange(setPartnership, 'drawings', v)} placeholder="₹" />
          <ValidatedInput label="Interest Rate (%)" value={partnership.rate} onChange={(v) => handleInputChange(setPartnership, 'rate', v)} placeholder="%" />
          <div className="col-span-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1 mb-1.5 block">Average Period</label>
            <select className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 outline-none border-2 border-transparent focus:border-brand-primary transition-all" value={partnership.period} onChange={(e) => setPartnership(p => ({...p, period: e.target.value}))}>
              <option value="6.5">Beginning of Month (6.5)</option>
              <option value="6">Middle of Month (6)</option>
              <option value="5.5">End of Month (5.5)</option>
            </select>
          </div>
        </div>
        <ResultDisplay label="Interest on Drawings" value={(parseFloat(partnership.drawings) * (parseFloat(partnership.rate)/100) * (parseFloat(partnership.period)/12) || 0).toFixed(2)} unit="₹" highlight />
      </CalculatorRoom>

      {/* NPSR Room */}
      <CalculatorRoom 
        isOpen={activeId === 'npsr'} 
        onClose={onClose} 
        title="NPSR & Sacrificing Ratio"
        description="Calculate new ratio when a partner is admitted"
        formula="\text{New Share} = \text{Old Share} - \text{Sacrificing Share}"
        theory={`When a new partner is admitted, the old partners sacrifice a part of their share in favor of the new partner.

New Profit Sharing Ratio (NPSR) is the ratio in which all partners (including the new one) will share future profits.
Sacrificing Ratio = Old Ratio - New Ratio.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Old Ratio (Partner A)" value={npsr.old1} onChange={(v) => handleInputChange(setNpsr, 'old1', v)} />
          <ValidatedInput label="Old Ratio (Partner B)" value={npsr.old2} onChange={(v) => handleInputChange(setNpsr, 'old2', v)} />
          <ValidatedInput label="New Partner's Share (Denominator)" value={npsr.share} onChange={(v) => handleInputChange(setNpsr, 'share', v)} placeholder="e.g. 5 for 1/5" />
        </div>
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-brand-primary/10 to-indigo-500/10 border border-brand-primary/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-indigo-500" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Calculated New Ratio</span>
          <p className="text-4xl font-black mt-3 text-brand-primary tracking-tighter">
            {`${(parseFloat(npsr.old1)*(1-1/parseFloat(npsr.share))).toFixed(1)} : ${(parseFloat(npsr.old2)*(1-1/parseFloat(npsr.share))).toFixed(1)} : 1`}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-5 font-medium leading-relaxed">*Simplified calculation for standard admission cases where the new partner acquires share from old partners in their old ratio.</p>
        </div>
      </CalculatorRoom>

      {/* Shares Room */}
      <CalculatorRoom 
        isOpen={activeId === 'shares'} 
        onClose={onClose} 
        title="Issue of Shares (Pro-rata)"
        description="Calculate excess application money"
        formula="\text{Excess App Money} = (\text{Applied} - \text{Allotted}) \times \text{App Money per Share}"
        theory={`Pro-rata allotment means allotment of shares in proportion to the number of shares applied for.

Excess Application Money = (Shares Applied - Shares Allotted) × Application Money per Share.
This excess is usually adjusted towards allotment.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Shares Applied" value={shares.applied} onChange={(v) => handleInputChange(setShares, 'applied', v)} />
          <ValidatedInput label="Shares Allotted" value={shares.allotted} onChange={(v) => handleInputChange(setShares, 'allotted', v)} />
          <div className="col-span-full">
            <ValidatedInput label="Application Money per Share" value={shares.appMoney} onChange={(v) => handleInputChange(setShares, 'appMoney', v)} placeholder="₹" />
          </div>
        </div>
        <ResultDisplay label="Excess Application Money" value={((parseFloat(shares.applied) - parseFloat(shares.allotted)) * parseFloat(shares.appMoney) || 0).toFixed(2)} unit="₹" highlight />
      </CalculatorRoom>

      {/* Goodwill Room */}
      <CalculatorRoom 
        isOpen={activeId === 'goodwill'} 
        onClose={onClose} 
        title="Goodwill Valuation"
        formula="\text{Goodwill} = \text{Super Profit} \times \text{Years Purchase}"
        theory={`Goodwill is an intangible asset that represents the reputation and customer loyalty of a business.

Super Profit Method:
1. Normal Profit = Capital Employed × Normal Rate of Return / 100
2. Super Profit = Average Profit - Normal Profit
3. Goodwill = Super Profit × Number of Years' Purchase`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Average Profit" value={goodwill.p1} onChange={(v) => handleInputChange(setGoodwill, 'p1', v)} />
          <ValidatedInput label="Normal Rate of Return (%)" value={goodwill.normalRate} onChange={(v) => handleInputChange(setGoodwill, 'normalRate', v)} />
          <ValidatedInput label="Capital Employed" value={goodwill.capitalEmployed} onChange={(v) => handleInputChange(setGoodwill, 'capitalEmployed', v)} />
          <ValidatedInput label="No. of Years Purchase" value={goodwill.years} onChange={(v) => handleInputChange(setGoodwill, 'years', v)} />
        </div>
        <ResultDisplay label="Goodwill (Super Profit Method)" value={((parseFloat(goodwill.p1) - (parseFloat(goodwill.capitalEmployed)*parseFloat(goodwill.normalRate)/100)) * parseFloat(goodwill.years) || 0).toFixed(2)} unit="₹" highlight />
      </CalculatorRoom>

      {/* Depreciation Room */}
      <CalculatorRoom 
        isOpen={activeId === 'depreciation'} 
        onClose={onClose} 
        title="Depreciation"
        formula="\text{WDV}_n = \text{Cost} \times (1 - \frac{\text{Rate}}{100})^n"
        theory={`Depreciation is the systematic reduction in the recorded cost of a fixed asset over its useful life.

Written Down Value (WDV) Method:
In this method, depreciation is charged at a fixed percentage on the book value (cost less depreciation) of the asset every year.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Original Cost" value={depr.cost} onChange={(v) => handleInputChange(setDepr, 'cost', v)} />
          <ValidatedInput label="Depreciation Rate (%)" value={depr.rate} onChange={(v) => handleInputChange(setDepr, 'rate', v)} />
          <ValidatedInput label="Number of Years" value={depr.years} onChange={(v) => handleInputChange(setDepr, 'years', v)} />
        </div>
        <ResultDisplay label="WDV after N Years" value={(parseFloat(depr.cost) * Math.pow(1 - parseFloat(depr.rate)/100, parseFloat(depr.years)) || 0).toFixed(2)} unit="₹" highlight />
      </CalculatorRoom>
    </>
  );
};

export default AccountancyCalc;
