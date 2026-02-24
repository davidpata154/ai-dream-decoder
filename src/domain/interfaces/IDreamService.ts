import type { DreamInterpretation, DreamRequest } from '@/domain/entities/Dream';

/**
 * Port: defines the contract for the Dream AI service.
 * Implementations can be swapped (Gemini, Mock, future providers)
 * without touching the application logic.
 */
export interface IDreamService {
  /**
   * Generates a dream interpretation from a description.
   * Internally runs text + image generation in parallel.
   */
  interpretDream(request: DreamRequest): Promise<DreamInterpretation>;

  /**
   * Generates an artistic image representing the dream.
   * @returns base64 data URI or remote URL
   */
  generateDreamImage(description: string): Promise<string>;

  /**
   * Generates a textual interpretation of the dream.
   * @returns interpretation text (50–150 words) and extracted tags
   */
  generateDreamText(
    description: string
  ): Promise<{ interpretation: string; tags: string[] }>;
}
