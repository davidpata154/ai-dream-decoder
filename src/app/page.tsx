'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton, Space } from 'antd';
import { DreamInput } from '@/components/DreamInput/DreamInput';
import { useDreamInterpreter } from '@/hooks/useDreamInterpreter';

// bundle-dynamic-imports: cargados solo cuando se necesitan
const DreamResult = dynamic(() =>
  import('@/components/DreamResult/DreamResult').then((m) => ({ default: m.DreamResult }))
);
const ErrorCard = dynamic(() =>
  import('@/components/ErrorCard/ErrorCard').then((m) => ({ default: m.ErrorCard }))
);

export default function HomePage() {
  const { status, result, error, interpret, reset } = useDreamInterpreter();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0B0B0E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Loading skeleton — RF-02 / RF-03 */}
      {status === 'loading' && (
        <Space
          orientation="vertical"
          size={16}
          style={{ width: '100%', maxWidth: 480, padding: '24px 24px 48px' }}
        >
          <Skeleton.Image active style={{ width: '100%', height: 220, borderRadius: 20 }} />
          <Skeleton active paragraph={{ rows: 4 }} />
        </Space>
      )}

      {/* Result view — RF-04 */}
      {status === 'success' && result ? (
        <DreamResult result={result} onReset={reset} />
      ) : null}

      {/* Input view — RF-01 */}
      {status === 'idle' ? (
        <DreamInput onSubmit={interpret} isLoading={false} />
      ) : null}

      {/* Error card — RF-05 */}
      {status === 'error' && error ? (
        <ErrorCard
          title={error.title}
          description={error.description}
          code={error.code}
          onRetry={reset}
        />
      ) : null}
    </main>
  );
}
