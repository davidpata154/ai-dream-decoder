import { NextRequest, NextResponse } from 'next/server';
import { GeminiDreamService } from '@/services/gemini/GeminiDreamService';
import { DreamServiceError } from '@/lib/errors';
import type { DreamRequest } from '@/domain/entities/Dream';

/**
 * API Route: POST /api/dream/interpret
 *
 * Gateway between the frontend and Gemini.
 * Keeps the API key server-side (RNF-01).
 * Validates input and returns a typed DreamInterpretation response.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DreamRequest;

    if (!body.description || typeof body.description !== 'string') {
      return NextResponse.json(
        { error: 'description is required and must be a string' },
        { status: 400 }
      );
    }

    const trimmed = body.description.trim();
    if (trimmed.length < 10 || trimmed.length > 1000) {
      return NextResponse.json(
        { error: 'description must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('[DreamAPI] GOOGLE_API_KEY is not configured');
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const service = new GeminiDreamService(apiKey);
    const result = await service.interpretDream({ description: trimmed });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[DreamAPI] Error interpreting dream:', error);

    if (error instanceof DreamServiceError) {
      const statusMap: Record<string, number> = {
        API_KEY_MISSING: 503,
        RATE_LIMITED: 429,
        GENERATION_FAILED: 502,
        INVALID_RESPONSE: 502,
        NETWORK_ERROR: 503,
        UNKNOWN: 500,
      };
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: statusMap[error.code] ?? 500 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
