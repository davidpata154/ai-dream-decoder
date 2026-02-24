import type { IDreamService } from '@/domain/interfaces/IDreamService';
import type { DreamInterpretation, DreamRequest } from '@/domain/entities/Dream';

/**
 * Mock adapter for IDreamService.
 * Used in tests and local development without a real API key.
 */
export class MockDreamService implements IDreamService {
  private readonly delayMs: number;

  constructor(delayMs = 500) {
    this.delayMs = delayMs;
  }

  async interpretDream(request: DreamRequest): Promise<DreamInterpretation> {
    const [textResult, imageUrl] = await Promise.all([
      this.generateDreamText(request.description),
      this.generateDreamImage(request.description),
    ]);

    return {
      description: request.description,
      interpretation: textResult.interpretation,
      imageUrl,
      tags: textResult.tags,
      generatedAt: new Date(),
    };
  }

  async generateDreamImage(_description: string): Promise<string> {
    await this.delay();
    // Returns a deterministic placeholder image
    return 'https://placehold.co/600x400/0B0B0E/6366F1?text=Dream+Vision';
  }

  async generateDreamText(
    _description: string
  ): Promise<{ interpretation: string; tags: string[] }> {
    await this.delay();
    return {
      interpretation:
        'This dream reflects a journey of inner transformation. The symbols present suggest ' +
        'a period of personal growth and heightened self-awareness. Water imagery often ' +
        'represents the subconscious mind, while light signals clarity emerging from ' +
        'confusion. Your psyche is processing transitions and inviting you to embrace ' +
        'change with courage. Trust the process unfolding within you.',
      tags: ['Transformación', 'Crecimiento', 'Autoconocimiento'],
    };
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delayMs));
  }
}
