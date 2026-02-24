/**
 * Custom error types for the Dream Decoder application.
 * Keeps error handling consistent and typed across layers.
 */

export class DreamServiceError extends Error {
  constructor(
    message: string,
    public readonly code: DreamErrorCode,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'DreamServiceError';
  }
}

export type DreamErrorCode =
  | 'API_KEY_MISSING'
  | 'GENERATION_FAILED'
  | 'INVALID_RESPONSE'
  | 'RATE_LIMITED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

/**
 * User-facing error messages — never expose raw API responses.
 */
export const ERROR_MESSAGES: Record<DreamErrorCode, { title: string; description: string }> = {
  API_KEY_MISSING: {
    title: 'Servicio no configurado',
    description: 'La API key no está disponible. Contacta al administrador.',
  },
  GENERATION_FAILED: {
    title: 'No se pudo interpretar el sueño',
    description: 'El servicio de IA no pudo procesar tu sueño. Intenta de nuevo.',
  },
  INVALID_RESPONSE: {
    title: 'Respuesta inesperada',
    description: 'Recibimos una respuesta inválida del servicio. Intenta de nuevo.',
  },
  RATE_LIMITED: {
    title: 'Límite de solicitudes alcanzado',
    description: 'Demasiadas solicitudes. Espera unos momentos antes de intentar de nuevo.',
  },
  NETWORK_ERROR: {
    title: 'Sin conexión',
    description: 'Verifica tu conexión a internet e intenta de nuevo.',
  },
  UNKNOWN: {
    title: 'Error inesperado',
    description: 'Algo salió mal. Por favor intenta de nuevo.',
  },
};

export function getUserFacingError(error: unknown): { title: string; description: string; code: DreamErrorCode } {
  const dreamError = toDreamServiceError(error);
  return { ...ERROR_MESSAGES[dreamError.code], code: dreamError.code };
}

export function toDreamServiceError(error: unknown): DreamServiceError {
  if (error instanceof DreamServiceError) return error;

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('api key') || message.includes('api_key')) {
      return new DreamServiceError(error.message, 'API_KEY_MISSING', error);
    }
    if (message.includes('rate') || message.includes('quota') || message.includes('429')) {
      return new DreamServiceError(error.message, 'RATE_LIMITED', error);
    }
    if (message.includes('network') || message.includes('fetch') || message.includes('failed to fetch')) {
      return new DreamServiceError(error.message, 'NETWORK_ERROR', error);
    }
    return new DreamServiceError(error.message, 'GENERATION_FAILED', error);
  }

  return new DreamServiceError('An unexpected error occurred', 'UNKNOWN', error);
}
