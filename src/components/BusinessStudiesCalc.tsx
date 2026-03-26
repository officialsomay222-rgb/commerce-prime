import React, { useState } from 'react';
import { CalculatorRoom } from './CalculatorRoom';
import { ResultDisplay } from './CalculatorCard';
import { ValidatedInput } from './ValidatedInput';

interface Props {
  activeId: string | null;
  onClose: () => void;
}

const BusinessStudiesCalc: React.FC<Props> = ({ activeId, onClose }) => {
  const [roi, setRoi] = useState({ ebit: '', investment: '' });
  const [eps, setEps] = useState({ netIncome: '', prefDiv: '', shares: '', interest: '', ebit: '' });
  const [wc, setWc] = useState({ ca: '', cl: '' });

  const handleInputChange = (setter: any, field: string, value: string) => {
    setter((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* ROI Room */}
      <CalculatorRoom 
        isOpen={activeId === 'roi'} 
        onClose={onClose} 
        title="Return on Investment (ROI)"
        formula="\text{ROI} = \frac{\text{EBIT}}{\text{Total Investment}} \times 100"
        theory={`Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment.

- EBIT: Earnings Before Interest and Taxes.
- Total Investment: The total amount of capital employed in the business.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="EBIT" value={roi.ebit} onChange={(v) => handleInputChange(setRoi, 'ebit', v)} />
          <ValidatedInput label="Total Investment" value={roi.investment} onChange={(v) => handleInputChange(setRoi, 'investment', v)} />
        </div>
        <ResultDisplay label="ROI" value={((parseFloat(roi.ebit) / parseFloat(roi.investment)) * 100 || 0).toFixed(2)} unit="%" highlight />
      </CalculatorRoom>

      {/* EPS & Leverage Room */}
      <CalculatorRoom 
        isOpen={activeId === 'eps'} 
        onClose={onClose} 
        title="EPS & Financial Leverage"
        formula="\text{EPS} = \frac{\text{Net Income} - \text{Pref Div}}{\text{No. of Shares}} \quad | \quad \text{Fin. Leverage} = \frac{\text{EBIT}}{\text{EBIT} - \text{Interest}}"
        theory={`Earnings Per Share (EPS) is the portion of a company's profit allocated to each outstanding share of common stock.

Financial Leverage:
It is the use of borrowed money (debt) to finance the purchase of assets with the expectation that the income or capital gain from the new asset will exceed the cost of borrowing.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Net Income" value={eps.netIncome} onChange={(v) => handleInputChange(setEps, 'netIncome', v)} />
          <ValidatedInput label="Pref. Dividend" value={eps.prefDiv} onChange={(v) => handleInputChange(setEps, 'prefDiv', v)} />
          <ValidatedInput label="No. of Shares" value={eps.shares} onChange={(v) => handleInputChange(setEps, 'shares', v)} />
          <ValidatedInput label="EBIT" value={eps.ebit} onChange={(v) => handleInputChange(setEps, 'ebit', v)} />
          <div className="col-span-full">
            <ValidatedInput label="Interest Expense" value={eps.interest} onChange={(v) => handleInputChange(setEps, 'interest', v)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultDisplay label="EPS" value={((parseFloat(eps.netIncome) - parseFloat(eps.prefDiv)) / parseFloat(eps.shares) || 0).toFixed(2)} unit="₹" highlight />
          <ResultDisplay label="Fin. Leverage" value={(parseFloat(eps.ebit) / (parseFloat(eps.ebit) - parseFloat(eps.interest)) || 0).toFixed(2)} unit="x" />
        </div>
      </CalculatorRoom>

      {/* Working Capital Room */}
      <CalculatorRoom 
        isOpen={activeId === 'working-capital'} 
        onClose={onClose} 
        title="Working Capital Requirement"
        formula="\text{NWC} = \text{CA} - \text{CL}"
        theory={`Working Capital is the difference between a company's current assets and current liabilities.

- Current Assets: Assets expected to be converted into cash within one year.
- Current Liabilities: Obligations expected to be paid within one year.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Current Assets" value={wc.ca} onChange={(v) => handleInputChange(setWc, 'ca', v)} />
          <ValidatedInput label="Current Liabilities" value={wc.cl} onChange={(v) => handleInputChange(setWc, 'cl', v)} />
        </div>
        <ResultDisplay label="Net Working Capital" value={(parseFloat(wc.ca) - parseFloat(wc.cl) || 0).toFixed(2)} unit="₹" highlight />
      </CalculatorRoom>
    </>
  );
};

export default BusinessStudiesCalc;
