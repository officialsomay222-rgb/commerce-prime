import React, { useState } from 'react';
import { CalculatorRoom } from './CalculatorRoom';
import { ResultDisplay } from './CalculatorCard';
import { ValidatedInput } from './ValidatedInput';

interface Props {
  activeId: string | null;
  onClose: () => void;
}

const EconomicsCalc: React.FC<Props> = ({ activeId, onClose }) => {
  const [multiplier, setMultiplier] = useState({ mpc: '', mps: '' });
  const [elasticity, setElasticity] = useState({ p1: '', p2: '', q1: '', q2: '' });
  const [costs, setCosts] = useState({ tfc: '', tvc: '', units: '' });
  const [ni, setNi] = useState({ gvo: '', ic: '', nit: '', depr: '' });
  const [cons, setCons] = useState({ autonomous: '', mpc: '', income: '' });

  const handleInputChange = (setter: any, field: string, value: string) => {
    setter((prev: any) => ({ ...prev, [field]: value }));
  };

  const gvaValue = parseFloat(ni.gvo) - parseFloat(ni.ic);

  return (
    <>
      {/* Multiplier Room */}
      <CalculatorRoom 
        isOpen={activeId === 'multiplier'} 
        onClose={onClose} 
        title="Investment Multiplier (K)"
        formula="\text{K} = \frac{1}{1 - \text{MPC}} = \frac{1}{\text{MPS}}"
        theory={`The Investment Multiplier (K) measures the change in national income resulting from a change in investment.

Relationship:
- Higher MPC (Marginal Propensity to Consume) leads to a higher multiplier.
- Higher MPS (Marginal Propensity to Save) leads to a lower multiplier.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="MPC" value={multiplier.mpc} onChange={(v) => handleInputChange(setMultiplier, 'mpc', v)} placeholder="e.g. 0.8" />
          <ValidatedInput label="MPS" value={multiplier.mps} onChange={(v) => handleInputChange(setMultiplier, 'mps', v)} placeholder="e.g. 0.2" />
        </div>
        <ResultDisplay label="Multiplier (K)" value={multiplier.mps ? (1/parseFloat(multiplier.mps)).toFixed(2) : (1/(1-parseFloat(multiplier.mpc)) || 0).toFixed(2)} highlight />
      </CalculatorRoom>

      {/* Elasticity Room */}
      <CalculatorRoom 
        isOpen={activeId === 'elasticity'} 
        onClose={onClose} 
        title="Price Elasticity"
        formula="\text{E}_d = \frac{\% \Delta \text{Q}}{\% \Delta \text{P}}"
        theory={`Price Elasticity of Demand (Ed) measures the responsiveness of quantity demanded to a change in price.

Types:
- Ed > 1: Elastic
- Ed < 1: Inelastic
- Ed = 1: Unitary Elastic`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Initial Price (P1)" value={elasticity.p1} onChange={(v) => handleInputChange(setElasticity, 'p1', v)} />
          <ValidatedInput label="New Price (P2)" value={elasticity.p2} onChange={(v) => handleInputChange(setElasticity, 'p2', v)} />
          <ValidatedInput label="Initial Quantity (Q1)" value={elasticity.q1} onChange={(v) => handleInputChange(setElasticity, 'q1', v)} />
          <ValidatedInput label="New Quantity (Q2)" value={elasticity.q2} onChange={(v) => handleInputChange(setElasticity, 'q2', v)} />
        </div>
        <ResultDisplay label="Elasticity (Ed)" value={Math.abs(((parseFloat(elasticity.q2)-parseFloat(elasticity.q1))/parseFloat(elasticity.q1)) / ((parseFloat(elasticity.p2)-parseFloat(elasticity.p1))/parseFloat(elasticity.p1)) || 0).toFixed(2)} highlight />
      </CalculatorRoom>

      {/* National Income Room */}
      <CalculatorRoom 
        isOpen={activeId === 'national-income'} 
        onClose={onClose} 
        title="National Income (Value Added)"
        description="Calculate GVAmp and NVAfc"
        formula="\text{GVA}_{MP} = \text{VO} - \text{IC} \quad | \quad \text{NVA}_{FC} = \text{GVA}_{MP} - \text{Depr} - \text{NIT}"
        theory={`The Value Added Method (Product Method) measures national income by estimating the contribution of each producing enterprise in the domestic territory.

1. GVA at MP = Value of Output - Intermediate Consumption
2. NVA at FC = GVA at MP - Depreciation - Net Indirect Taxes (NIT)`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Value of Output" value={ni.gvo} onChange={(v) => handleInputChange(setNi, 'gvo', v)} />
          <ValidatedInput label="Intermediate Consumption" value={ni.ic} onChange={(v) => handleInputChange(setNi, 'ic', v)} />
          <ValidatedInput label="Depreciation" value={ni.depr} onChange={(v) => handleInputChange(setNi, 'depr', v)} />
          <ValidatedInput label="Net Indirect Tax (NIT)" value={ni.nit} onChange={(v) => handleInputChange(setNi, 'nit', v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultDisplay label="GVA at MP" value={(gvaValue || 0).toFixed(2)} unit="Cr" highlight />
          <ResultDisplay label="NVA at FC" value={(gvaValue - parseFloat(ni.depr) - parseFloat(ni.nit) || 0).toFixed(2)} unit="Cr" />
        </div>
      </CalculatorRoom>

      {/* Consumption Function Room */}
      <CalculatorRoom 
        isOpen={activeId === 'consumption'} 
        onClose={onClose} 
        title="Consumption Function"
        formula="\text{C} = \bar{c} + b\text{Y}"
        theory={`The consumption function shows the relationship between consumption and national income.

- Autonomous Consumption (c): Consumption when income is zero.
- Marginal Propensity to Consume (b/MPC): The ratio of change in consumption to change in income.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput label="Autonomous Cons. (c)" value={cons.autonomous} onChange={(v) => handleInputChange(setCons, 'autonomous', v)} />
          <ValidatedInput label="MPC (b)" value={cons.mpc} onChange={(v) => handleInputChange(setCons, 'mpc', v)} />
          <div className="col-span-full">
            <ValidatedInput label="National Income (Y)" value={cons.income} onChange={(v) => handleInputChange(setCons, 'income', v)} />
          </div>
        </div>
        <ResultDisplay label="Total Consumption (C)" value={(parseFloat(cons.autonomous) + (parseFloat(cons.mpc) * parseFloat(cons.income)) || 0).toFixed(2)} highlight />
      </CalculatorRoom>

      {/* Costs Room */}
      <CalculatorRoom 
        isOpen={activeId === 'costs'} 
        onClose={onClose} 
        title="Cost Analysis"
        theory={`Cost analysis involves studying the behavior of total, average, and marginal costs as output changes.

- Total Fixed Cost (TFC): Costs that do not vary with output.
- Total Variable Cost (TVC): Costs that vary directly with output.
- Average Cost (AC) = (TFC + TVC) / Units`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValidatedInput label="Total Fixed Cost (TFC)" value={costs.tfc} onChange={(v) => handleInputChange(setCosts, 'tfc', v)} />
          <ValidatedInput label="Total Var. Cost (TVC)" value={costs.tvc} onChange={(v) => handleInputChange(setCosts, 'tvc', v)} />
          <ValidatedInput label="Units Produced" value={costs.units} onChange={(v) => handleInputChange(setCosts, 'units', v)} />
        </div>
        <ResultDisplay label="Average Cost (AC)" value={((parseFloat(costs.tfc)+parseFloat(costs.tvc))/parseFloat(costs.units) || 0).toFixed(2)} highlight />
      </CalculatorRoom>
    </>
  );
};

export default EconomicsCalc;
