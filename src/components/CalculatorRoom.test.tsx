import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CalculatorRoom } from './CalculatorRoom';

describe('CalculatorRoom', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Calculator',
    description: 'Test Description',
    formula: 'E=mc^2',
    theory: 'Test Theory Content',
  };

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <CalculatorRoom {...defaultProps} isOpen={false}>
        <div>Calculator Content</div>
      </CalculatorRoom>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title and description when isOpen is true', () => {
    render(
      <CalculatorRoom {...defaultProps}>
        <div>Calculator Content</div>
      </CalculatorRoom>
    );

    expect(screen.getByText('Test Calculator')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Calculator Content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <CalculatorRoom {...defaultProps}>
        <div>Calculator Content</div>
      </CalculatorRoom>
    );

    // The close button is an X icon from lucide-react. Let's find the button containing it.
    // We can find it by looking for the button element that has no specific text but contains the svg.
    // Or simpler, we can find the button next to the tabs.
    // The tabs are "Calculator" and "Theory".
    // Another approach: The close button triggers onClose.
    const closeButtons = screen.getAllByRole('button');
    // The close button is likely the last button in the header, or the only one with no text content.
    const closeButton = closeButtons.find(btn => btn.textContent === '');
    if (closeButton) {
      fireEvent.click(closeButton);
    } else {
      // Let's just click the button that is for closing
      // Let's use generic selection based on our knowledge of the component
      // it has onClick={onClose}
      const closeBtn = document.querySelector('button > svg.lucide-x')?.parentElement;
      if (closeBtn) {
          fireEvent.click(closeBtn);
      }
    }
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('switches between Calculator and Theory tabs', async () => {
    render(
      <CalculatorRoom {...defaultProps}>
        <div>Calculator Content</div>
      </CalculatorRoom>
    );

    // Initially should show calculator content and formula
    expect(screen.getByText('Calculator Content')).toBeInTheDocument();
    expect(screen.getByText('Curriculum Standard Formula')).toBeInTheDocument();

    // Click Theory tab
    const theoryTabs = screen.getAllByText('Theory');
    fireEvent.click(theoryTabs[0]);

    // Should now show theory content
    expect(await screen.findByText('Theoretical Concept')).toBeInTheDocument();
    expect(screen.getByText('Test Theory Content')).toBeInTheDocument();

    // Calculator content should not be in the document
    expect(screen.queryByText('Calculator Content')).not.toBeInTheDocument();

    // Click Calculator tab back
    const calcTabs = screen.getAllByText('Calculator');
    fireEvent.click(calcTabs[0]);

    // Should show calculator content again
    expect(await screen.findByText('Calculator Content')).toBeInTheDocument();
  });
});
