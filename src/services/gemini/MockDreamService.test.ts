import { MockDreamService } from './MockDreamService';
import type { IDreamService } from '@/domain/interfaces/IDreamService';

describe('MockDreamService', () => {
  let service: IDreamService;

  beforeEach(() => {
    service = new MockDreamService(0); // 0ms delay for fast tests
  });

  describe('IDreamService contract', () => {
    it('implements IDreamService interface', () => {
      expect(typeof service.interpretDream).toBe('function');
      expect(typeof service.generateDreamImage).toBe('function');
      expect(typeof service.generateDreamText).toBe('function');
    });
  });

  describe('interpretDream()', () => {
    it('returns a valid DreamInterpretation', async () => {
      const result = await service.interpretDream({ description: 'I was flying over mountains' });

      expect(result.description).toBe('I was flying over mountains');
      expect(result.interpretation).toBeTruthy();
      expect(result.imageUrl).toBeTruthy();
      expect(Array.isArray(result.tags)).toBe(true);
      expect(result.tags.length).toBeGreaterThan(0);
      expect(result.generatedAt).toBeInstanceOf(Date);
    });

    it('runs image and text generation in parallel (both called)', async () => {
      const imageSpy = jest.spyOn(service, 'generateDreamImage');
      const textSpy = jest.spyOn(service, 'generateDreamText');

      await service.interpretDream({ description: 'A dream about the ocean' });

      expect(imageSpy).toHaveBeenCalledTimes(1);
      expect(textSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('generateDreamImage()', () => {
    it('returns a non-empty string (URL or data URI)', async () => {
      const imageUrl = await service.generateDreamImage('flying dream');
      expect(typeof imageUrl).toBe('string');
      expect(imageUrl.length).toBeGreaterThan(0);
    });

    it('returns a placeholder URL', async () => {
      const imageUrl = await service.generateDreamImage('any dream');
      expect(imageUrl).toContain('placehold.co');
    });
  });

  describe('generateDreamText()', () => {
    it('returns interpretation and tags', async () => {
      const result = await service.generateDreamText('test dream');
      expect(typeof result.interpretation).toBe('string');
      expect(result.interpretation.length).toBeGreaterThan(0);
      expect(Array.isArray(result.tags)).toBe(true);
      expect(result.tags.length).toBe(3);
    });

    it('returns interpretation with at least 50 characters', async () => {
      const result = await service.generateDreamText('I dreamed of the sea');
      // 50 words ≈ 300+ characters
      const wordCount = result.interpretation.split(' ').length;
      expect(wordCount).toBeGreaterThanOrEqual(30);
    });
  });
});
