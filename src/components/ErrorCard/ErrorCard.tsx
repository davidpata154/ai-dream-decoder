'use client';

import React from 'react';
import { AlertTriangle, Timer, WifiOff, RefreshCw } from 'lucide-react';
import type { DreamErrorCode } from '@/lib/errors';

interface ErrorCardProps {
  title: string;
  description: string;
  code: DreamErrorCode;
  onRetry: () => void;
}

const ERROR_VARIANTS: Record<string, {
  color: string;
  bgColor: string;
  borderColor: string;
  Icon: React.FC<{ size: number; color: string; strokeWidth: number }>;
  badge?: string;
}> = {
  RATE_LIMITED: {
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.12)',
    borderColor: '#F59E0B',
    Icon: Timer,
    badge: 'Intenta de nuevo en unos momentos',
  },
  NETWORK_ERROR: {
    color: '#6366F1',
    bgColor: 'rgba(99,102,241,0.12)',
    borderColor: '#6366F1',
    Icon: WifiOff,
  },
};

const DEFAULT_VARIANT = {
  color: '#E85A4F',
  bgColor: 'rgba(232,90,79,0.12)',
  borderColor: '#E85A4F',
  Icon: AlertTriangle,
};

export function ErrorCard({ title, description, code, onRetry }: ErrorCardProps) {
  const variant = ERROR_VARIANTS[code] ?? DEFAULT_VARIANT;
  const { color, bgColor, borderColor, Icon, badge } = variant;

  return (
    <div
      style={{
        width: 400,
        backgroundColor: '#1A1A1E',
        borderRadius: 24,
        border: `1px solid ${borderColor}`,
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
      }}
    >
      {/* Icono circular */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={28} color={color} strokeWidth={1.5} />
      </div>

      {/* Título */}
      <h2
        style={{
          color: '#FAFAF9',
          fontSize: 20,
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {title}
      </h2>

      {/* Descripción */}
      <p
        style={{
          color: '#8E8E93',
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 1.6,
          margin: 0,
          maxWidth: 300,
        }}
      >
        {description}
      </p>

      {/* Badge para rate limited */}
      {badge && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: `${bgColor}`,
            borderRadius: 8,
            padding: '8px 16px',
          }}
        >
          <div
            style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color, flexShrink: 0 }}
          />
          <span style={{ color, fontSize: 12, fontWeight: 500 }}>{badge}</span>
        </div>
      )}

      {/* Botón Reintentar */}
      <button
        onClick={onRetry}
        style={{
          backgroundColor: '#6366F1',
          border: 'none',
          borderRadius: 12,
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          color: '#FAFAF9',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        <RefreshCw size={16} color="#FAFAF9" strokeWidth={2} />
        Reintentar
      </button>
    </div>
  );
}
