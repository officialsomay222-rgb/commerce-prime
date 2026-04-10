import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import EconomicsCalc from './EconomicsCalc';
import { expect, test, describe, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

// We need to mock react-katex to prevent errors with jsdom and canvas
vi.mock('react-katex', () => ({
  BlockMath: ({ math }: { math: string }) => <div>{math}</div>,
  InlineMath: ({ math }: { math: string }) => <span>{math}</span>,
}));

describe('EconomicsCalc', () => {
  const mockOnClose = vi.fn();

  // Helper to find inputs
  const getInputByLabel = (container: HTMLElement, labelText: string) => {
    const labels = within(container).getAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'label' && content.includes(labelText);
    });
    // ValidatedInput renders a label and a relative div containing the input
    const label = labels[0];
    return label.nextElementSibling?.querySelector('input') as HTMLInputElement;
  };

  test('calculates investment multiplier (K) from MPS', async () => {
    const { container } = render(<EconomicsCalc activeId="multiplier" onClose={mockOnClose} />);

    const mpsInput = screen.getByPlaceholderText('e.g. 0.2');
    await userEvent.type(mpsInput, '0.2');

    expect(screen.getByText('5.00')).toBeInTheDocument();
  });

  test('calculates investment multiplier (K) from MPC', async () => {
    const { container } = render(<EconomicsCalc activeId="multiplier" onClose={mockOnClose} />);

    const mpcInput = getInputByLabel(container, 'MPC');
    await userEvent.type(mpcInput, '0.8');

    // Expected multiplier: 1 / (1 - 0.8) = 1 / 0.2 = 5
    const elements = screen.getAllByText('5.00');
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });

  test('calculates price elasticity (Ed)', async () => {
    const { container } = render(<EconomicsCalc activeId="elasticity" onClose={mockOnClose} />);

    const p1 = getInputByLabel(container, 'Initial Price (P1)');
    const p2 = getInputByLabel(container, 'New Price (P2)');
    const q1 = getInputByLabel(container, 'Initial Quantity (Q1)');
    const q2 = getInputByLabel(container, 'New Quantity (Q2)');

    await userEvent.type(p1, '10');
    await userEvent.type(p2, '12');
    await userEvent.type(q1, '100');
    await userEvent.type(q2, '80');

    // Elasticity: |((80-100)/100) / ((12-10)/10)| = |-0.2 / 0.2| = 1.00
    expect(screen.getByText('1.00')).toBeInTheDocument();
  });

  test('calculates National Income (GVA at MP and NVA at FC)', async () => {
    const { container } = render(<EconomicsCalc activeId="national-income" onClose={mockOnClose} />);

    const gvo = getInputByLabel(container, 'Value of Output');
    const ic = getInputByLabel(container, 'Intermediate Consumption');
    const depr = getInputByLabel(container, 'Depreciation');
    const nit = getInputByLabel(container, 'Net Indirect Tax (NIT)');

    await userEvent.type(gvo, '1000');
    await userEvent.type(ic, '400');
    await userEvent.type(depr, '100');
    await userEvent.type(nit, '50');

    // GVA at MP = 1000 - 400 = 600
    // NVA at FC = 600 - 100 - 50 = 450
    expect(screen.getByText('600.00')).toBeInTheDocument();
    expect(screen.getByText('450.00')).toBeInTheDocument();
  });

  test('calculates Consumption Function', async () => {
    const { container } = render(<EconomicsCalc activeId="consumption" onClose={mockOnClose} />);

    const autoCons = getInputByLabel(container, 'Autonomous Cons. (c)');
    const mpc = getInputByLabel(container, 'MPC (b)');
    const income = getInputByLabel(container, 'National Income (Y)');

    await userEvent.type(autoCons, '100');
    await userEvent.type(mpc, '0.8');
    await userEvent.type(income, '1000');

    // C = 100 + (0.8 * 1000) = 100 + 800 = 900
    expect(screen.getByText('900.00')).toBeInTheDocument();
  });

  test('calculates Cost Analysis (Average Cost)', async () => {
    const { container } = render(<EconomicsCalc activeId="costs" onClose={mockOnClose} />);

    const tfc = getInputByLabel(container, 'Total Fixed Cost (TFC)');
    const tvc = getInputByLabel(container, 'Total Var. Cost (TVC)');
    const units = getInputByLabel(container, 'Units Produced');

    await userEvent.type(tfc, '500');
    await userEvent.type(tvc, '1000');
    await userEvent.type(units, '100');

    // AC = (500 + 1000) / 100 = 1500 / 100 = 15
    expect(screen.getByText('15.00')).toBeInTheDocument();
  });
});
