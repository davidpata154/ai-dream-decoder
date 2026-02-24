import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DreamResult } from './DreamResult';
import type { DreamInterpretation } from '@/domain/entities/Dream';

jest.mock('lucide-react', () => ({
  ArrowLeftIcon: () => <span data-testid="icon-arrow-left" />,
  BrainCircuitIcon: () => <span data-testid="icon-brain" />,
  RefreshCwIcon: () => <span data-testid="icon-refresh" />,
  Share2Icon: () => <span data-testid="icon-share" />,
}));

const mockResult: DreamInterpretation = {
  description: 'Soñé que volaba sobre una ciudad de cristal',
  interpretation:
    'Este sueño refleja un deseo de liberación y perspectiva elevada. ' +
    'El cristal simboliza claridad y transparencia en tus pensamientos. ' +
    'Volar representa libertad y la capacidad de superar obstáculos. ' +
    'Tu subconsciente te invita a ver las situaciones desde una perspectiva más amplia.',
  imageUrl: 'https://placehold.co/600x400/0B0B0E/6366F1?text=Dream',
  tags: ['Libertad', 'Claridad', 'Transformación'],
  generatedAt: new Date('2026-02-24T00:00:00Z'),
};

const setup = (onReset = jest.fn()) => {
  return { ...render(<DreamResult result={mockResult} onReset={onReset} />), onReset };
};

describe('DreamResult', () => {
  describe('RF-04: Pantalla de resultado', () => {
    it('renders the dream image', () => {
      setup();
      const image = screen.getByAltText(/representación artística/i);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockResult.imageUrl);
    });

    it('renders the interpretation text', () => {
      setup();
      expect(screen.getByText(/deseo de liberación/i)).toBeInTheDocument();
    });

    it('renders all tags', () => {
      setup();
      expect(screen.getByText('Libertad')).toBeInTheDocument();
      expect(screen.getByText('Claridad')).toBeInTheDocument();
      expect(screen.getByText('Transformación')).toBeInTheDocument();
    });

    it('renders "Tu interpretación" title', () => {
      setup();
      expect(screen.getByText(/tu interpretación/i)).toBeInTheDocument();
    });

    it('calls onReset when "Nueva interpretación" button clicked', () => {
      const { onReset } = setup();
      fireEvent.click(screen.getByText(/nueva interpretación/i));
      expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('calls onReset when back arrow button clicked', () => {
      const { onReset } = setup();
      fireEvent.click(screen.getByRole('button', { name: /volver/i }));
      expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('renders the "Interpretación" page title', () => {
      setup();
      expect(screen.getByText('Interpretación')).toBeInTheDocument();
    });

    it('renders Compartir button', () => {
      setup();
      expect(screen.getByText(/compartir/i)).toBeInTheDocument();
    });
  });
});
