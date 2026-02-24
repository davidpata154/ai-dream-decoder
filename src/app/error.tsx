'use client';

import React from 'react';
import { Button, Result } from 'antd';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for the Next.js App Router.
 * Catches unhandled errors at the page level (RF-05).
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    console.error('[ErrorBoundary]', error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0B0B0E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Result
        status="error"
        title="Algo salió mal"
        subTitle="Ocurrió un error inesperado. Por favor intenta nuevamente."
        extra={
          <Button type="primary" onClick={reset}>
            Intentar de nuevo
          </Button>
        }
      />
    </main>
  );
}
