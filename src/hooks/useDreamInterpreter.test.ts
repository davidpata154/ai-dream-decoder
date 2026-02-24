import { renderHook, act, waitFor } from '@testing-library/react';
import { useDreamInterpreter } from './useDreamInterpreter';

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockSuccessResponse = {
  description: 'Flying over a crystal city',
  interpretation: 'This dream reflects freedom and clarity in your thoughts.',
  imageUrl: 'https://placehold.co/600x400',
  tags: ['Freedom', 'Clarity'],
  generatedAt: new Date().toISOString(),
};

describe('useDreamInterpreter', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('initial state', () => {
    it('starts idle with no result or error', () => {
      const { result } = renderHook(() => useDreamInterpreter());
      expect(result.current.status).toBe('idle');
      expect(result.current.result).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  describe('interpret()', () => {
    it('sets status to loading during fetch', async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ ok: true, json: () => Promise.resolve(mockSuccessResponse) }),
              100
            )
          )
      );

      const { result } = renderHook(() => useDreamInterpreter());
      act(() => { result.current.interpret('I was flying over mountains'); });
      expect(result.current.status).toBe('loading');
    });

    it('sets status to success and returns result', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      });

      const { result } = renderHook(() => useDreamInterpreter());
      await act(async () => { await result.current.interpret('Flying over crystal city'); });

      await waitFor(() => { expect(result.current.status).toBe('success'); });
      expect(result.current.result).toEqual(mockSuccessResponse);
      expect(result.current.error).toBeNull();
    });

    it('calls POST /api/dream/interpret with description', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      });

      const { result } = renderHook(() => useDreamInterpreter());
      await act(async () => { await result.current.interpret('A dream about the sea'); });

      expect(mockFetch).toHaveBeenCalledWith('/api/dream/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'A dream about the sea' }),
      });
    });

    it('sets status to error with user-friendly message on failed response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Service unavailable', code: 'GENERATION_FAILED' }),
      });

      const { result } = renderHook(() => useDreamInterpreter());
      await act(async () => { await result.current.interpret('A dream that fails'); });

      await waitFor(() => { expect(result.current.status).toBe('error'); });
      // error should have user-friendly title and description, not raw API text
      expect(result.current.error).not.toBeNull();
      expect(result.current.error?.title).toBeTruthy();
      expect(result.current.error?.description).toBeTruthy();
      expect(result.current.result).toBeNull();
    });

    it('sets error on network failure', async () => {
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      const { result } = renderHook(() => useDreamInterpreter());
      await act(async () => { await result.current.interpret('Dream causing network error'); });

      await waitFor(() => { expect(result.current.status).toBe('error'); });
      expect(result.current.error?.title).toBeTruthy();
    });
  });

  describe('reset()', () => {
    it('resets to idle state clearing result and error', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      });

      const { result } = renderHook(() => useDreamInterpreter());
      await act(async () => { await result.current.interpret('Flying over mountains'); });
      act(() => { result.current.reset(); });

      expect(result.current.status).toBe('idle');
      expect(result.current.result).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });
});
