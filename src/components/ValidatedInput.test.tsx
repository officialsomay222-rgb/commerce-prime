import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ValidatedInput } from './ValidatedInput';
import { vi } from 'vitest';
import { useState } from 'react';

const StatefulWrapper = (props: any) => {
  const [value, setValue] = useState(props.value || '');
  return <ValidatedInput {...props} value={value} onChange={(v) => { setValue(v); props.onChange(v); }} />;
};

describe('ValidatedInput', () => {
  const defaultProps = {
    label: 'Test Label',
    value: '',
    onChange: vi.fn(),
    placeholder: 'Test Placeholder',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with given label, value, and placeholder', () => {
    render(<ValidatedInput {...defaultProps} value="123" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  it('triggers onChange callback with the correct value when the user types', async () => {
    const user = userEvent.setup();
    render(<StatefulWrapper {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, '123');

    expect(defaultProps.onChange).toHaveBeenCalledTimes(3);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith('123');
  });

  it('displays external error message when error prop is provided', () => {
    render(<ValidatedInput {...defaultProps} error="External error occurred" />);

    expect(screen.getByText('External error occurred')).toBeInTheDocument();
  });

  it('displays internal validation error when the user types a non-numeric value', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ValidatedInput {...defaultProps} />);

    const input = screen.getByRole('textbox');

    // Simulate user typing "abc" which would trigger onChange, and parent component would update value prop.
    await user.type(input, 'a');
    expect(defaultProps.onChange).toHaveBeenCalledWith('a');

    // Rerender with the new value
    rerender(<ValidatedInput {...defaultProps} value="a" />);

    expect(screen.getByText('Please enter a valid number')).toBeInTheDocument();
  });

  it('clears internal validation error when the user corrects the input to a valid number', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ValidatedInput {...defaultProps} />);

    const input = screen.getByRole('textbox');

    // Type non-numeric and rerender
    await user.type(input, 'a');
    rerender(<ValidatedInput {...defaultProps} value="a" />);
    expect(screen.getByText('Please enter a valid number')).toBeInTheDocument();

    // Type numeric and rerender
    await user.clear(input);
    await user.type(input, '12');
    rerender(<ValidatedInput {...defaultProps} value="12" />);

    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid number')).not.toBeInTheDocument();
    });
  });
});
