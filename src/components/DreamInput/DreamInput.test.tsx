import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DreamInput } from './DreamInput';

// Mock Ant Design icons to avoid SVG import issues in Jest
jest.mock('lucide-react', () => ({
  MoonIcon: () => <span data-testid="icon-moon" />,
  SparklesIcon: () => <span data-testid="icon-sparkles" />,
}));

// Mock antd to avoid CSS-in-JS issues in JSDOM
jest.mock('antd', () => {
  const actual = jest.requireActual('antd');
  return {
    ...actual,
    ConfigProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

const setup = (props: Partial<React.ComponentProps<typeof DreamInput>> = {}) => {
  const onSubmit = jest.fn();
  const utils = render(<DreamInput onSubmit={onSubmit} {...props} />);
  const textarea = screen.getByRole('textbox', { name: /descripción del sueño/i });
  // When loading, button text is "Interpretando..." — use getAllByRole to avoid name mismatch
  const allButtons = screen.getAllByRole('button');
  const button = allButtons[0]; // The main CTA button is the first/only button
  return { ...utils, textarea, button, onSubmit };
};

describe('DreamInput', () => {
  describe('RF-01: Entrada del sueño', () => {
    it('renders textarea and button', () => {
      const { textarea, button } = setup();
      expect(textarea).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('button is disabled when input is empty', () => {
      const { button } = setup();
      expect(button).toBeDisabled();
    });

    it('button is disabled when input is less than 10 characters', () => {
      const { textarea, button } = setup();
      fireEvent.change(textarea, { target: { value: 'corto' } });
      expect(button).toBeDisabled();
    });

    it('button is enabled when input has at least 10 characters', () => {
      const { textarea } = setup();
      fireEvent.change(textarea, { target: { value: 'Soñé que volaba sobre montañas' } });
      const submitBtn = screen.getByRole('button', { name: /interpretar mi sueño/i });
      expect(submitBtn).not.toBeDisabled();
    });

    it('shows character counter', () => {
      const { textarea } = setup();
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      expect(screen.getByText(/4\/1000/)).toBeInTheDocument();
    });

    it('calls onSubmit with trimmed text when button clicked', () => {
      const { textarea, button, onSubmit } = setup();
      const description = '  Soñé que volaba sobre montañas  ';
      fireEvent.change(textarea, { target: { value: description } });
      fireEvent.click(button);
      expect(onSubmit).toHaveBeenCalledWith(description.trim());
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not call onSubmit when loading', () => {
      const { textarea, onSubmit } = setup({ isLoading: true });
      fireEvent.change(textarea, { target: { value: 'Soñé que volaba sobre montañas' } });
      // When loading, all buttons are disabled or loading — find any button and click
      const buttons = screen.getAllByRole('button');
      buttons.forEach((btn) => fireEvent.click(btn));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('shows minimum length hint for short inputs', () => {
      const { textarea } = setup();
      fireEvent.change(textarea, { target: { value: 'corto' } });
      expect(screen.getByText(/mínimo 10 caracteres/i)).toBeInTheDocument();
    });

    it('textarea respects maxLength of 1000', () => {
      const { textarea } = setup();
      // Set exactly MAX_LENGTH characters — component shows N/1000 counter
      const maxText = 'a'.repeat(1000);
      fireEvent.change(textarea, { target: { value: maxText } });
      expect(screen.getByText(/1000\/1000/)).toBeInTheDocument();
    });

    it('shows loading state in button text', () => {
      // When isLoading=true the button text switches to "Interpretando..."
      const { utils } = { utils: render(<DreamInput onSubmit={jest.fn()} isLoading={true} />) };
      void utils; // suppress unused variable warning
      expect(screen.getByText(/interpretando/i)).toBeInTheDocument();
    });
  });
});
