'use client';

import { useState, useCallback } from 'react';
import type { DreamInterpretation, DreamStatus } from '@/domain/entities/Dream';
import { getUserFacingError, type DreamErrorCode } from '@/lib/errors';

export interface DreamError {
  title: string;
  description: string;
  code: DreamErrorCode;
}

interface UseDreamInterpreterReturn {
  status: DreamStatus;
  result: DreamInterpretation | null;
  error: DreamError | null;
  interpret: (description: string) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook that orchestrates the dream interpretation flow.
 * Calls the /api/dream/interpret route — never touches Gemini directly.
 */
export function useDreamInterpreter(): UseDreamInterpreterReturn {
  const [status, setStatus] = useState<DreamStatus>('idle');
  const [result, setResult] = useState<DreamInterpretation | null>(null);
  const [error, setError] = useState<DreamError | null>(null);

  const interpret = useCallback(async (description: string) => {
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/dream/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string; code?: string };
        throw new Error(errorData.code ?? errorData.error ?? 'GENERATION_FAILED');
      }

      const data = (await response.json()) as DreamInterpretation;
      setResult(data);
      setStatus('success');
    } catch (err) {
      console.error('[useDreamInterpreter]', err);
      setError(getUserFacingError(err));
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, interpret, reset };
}
