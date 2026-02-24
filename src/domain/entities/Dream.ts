/**
 * Domain entities for AI Dream Decoder.
 * These types are framework-agnostic — no Next.js, no Ant Design imports.
 */

export interface DreamInterpretation {
  /** The original dream description provided by the user */
  description: string;
  /** AI-generated interpretation text (50–150 words) */
  interpretation: string;
  /** URL or base64 data URI of the AI-generated image */
  imageUrl: string;
  /** Thematic tags extracted from the interpretation */
  tags: string[];
  /** Timestamp of when the interpretation was generated */
  generatedAt: Date;
}

export interface DreamRequest {
  /** User's dream description (10–1000 chars) */
  description: string;
}

export type DreamStatus = 'idle' | 'loading' | 'success' | 'error';
