import { GoogleGenAI } from '@google/genai';
import type { IDreamService } from '@/domain/interfaces/IDreamService';
import type { DreamInterpretation, DreamRequest } from '@/domain/entities/Dream';
import { DreamServiceError, toDreamServiceError } from '@/lib/errors';

const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

/**
 * Gemini adapter for IDreamService.
 * Uses @google/genai SDK for text interpretation and image generation.
 * Runs both requests in parallel via Promise.all for performance (RNF-03).
 */
export class GeminiDreamService implements IDreamService {
  private readonly ai: GoogleGenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new DreamServiceError(
        'GOOGLE_API_KEY is required to use GeminiDreamService',
        'API_KEY_MISSING'
      );
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async interpretDream(request: DreamRequest): Promise<DreamInterpretation> {
    try {
      // RF-03: parallel calls for text + image (RNF-03 performance)
      const [textResult, imageUrl] = await Promise.all([
        this.generateDreamText(request.description),
        // Image generation has a graceful fallback — text is the core value
        this.generateDreamImage(request.description).catch((err: unknown) => {
          console.error('[Gemini] Image generation failed, using fallback:', err);
          return `https://placehold.co/600x400/0B0B0E/6366F1?text=Dream+Vision`;
        }),
      ]);

      return {
        description: request.description,
        interpretation: textResult.interpretation,
        imageUrl,
        tags: textResult.tags,
        generatedAt: new Date(),
      };
    } catch (error) {
      throw toDreamServiceError(error);
    }
  }

  async generateDreamImage(description: string): Promise<string> {
    const prompt = `Surreal dreamlike scene: "${description}". Style: mystical, ethereal, dark fantasy, high quality digital art.`;

    const response = await this.ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: prompt,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;

    if (!inlineData?.data) {
      throw new DreamServiceError('No image data in Gemini response', 'INVALID_RESPONSE');
    }

    const mimeType = inlineData.mimeType ?? 'image/png';
    return `data:${mimeType};base64,${inlineData.data}`;
  }

  async generateDreamText(
    description: string
  ): Promise<{ interpretation: string; tags: string[] }> {
    const prompt = `Eres un intérprete de sueños. Analiza la siguiente descripción de sueño y proporciona:
1. Una breve interpretación (50-150 palabras) explorando su significado simbólico y relevancia psicológica.
2. Tres etiquetas temáticas (palabras sueltas o frases cortas).

Todo debe estar escrito en español.

Sueño: "${description}"

Responde ÚNICAMENTE con JSON válido en este formato exacto:
{
  "interpretation": "...",
  "tags": ["Etiqueta1", "Etiqueta2", "Etiqueta3"]
}`;

    const response = await this.ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    const text = response.text;

    if (!text) {
      throw new DreamServiceError('No text content in Gemini response', 'INVALID_RESPONSE');
    }

    try {
      // Strip markdown code fences if present (e.g. ```json ... ```)
      const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
      const parsed = JSON.parse(clean) as { interpretation: string; tags: string[] };
      return parsed;
    } catch {
      console.error('[Gemini] Raw text response:', text);
      throw new DreamServiceError('Failed to parse Gemini JSON response', 'INVALID_RESPONSE');
    }
  }
}
