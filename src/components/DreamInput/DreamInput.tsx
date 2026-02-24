'use client';

import React, { useState } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import { MoonIcon, SparklesIcon } from 'lucide-react';

const { TextArea } = Input;
const { Title, Text } = Typography;

const MIN_LENGTH = 10;
const MAX_LENGTH = 1000;

interface DreamInputProps {
  onSubmit: (description: string) => void;
  isLoading?: boolean;
}

export function DreamInput({ onSubmit, isLoading = false }: DreamInputProps) {
  const [value, setValue] = useState('');

  const trimmed = value.trim();
  const charCount = value.length;
  const isValid = trimmed.length >= MIN_LENGTH && trimmed.length <= MAX_LENGTH;

  const handleSubmit = () => {
    if (isValid && !isLoading) {
      onSubmit(trimmed);
    }
  };

  return (
    <Space
      orientation="vertical"
      size={24}
      style={{
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        padding: '48px 24px',
      }}
    >
      {/* Hero */}
      <Space orientation="vertical" size={8} style={{ textAlign: 'center', width: '100%' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#1A1A1E',
            boxShadow: '0 0 24px rgba(99,102,241,0.4)',
            margin: '0 auto',
          }}
        >
          <MoonIcon size={28} color="#6366F1" strokeWidth={1.5} />
        </div>
        <Title
          level={2}
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            color: '#FAFAF9',
            marginBottom: 0,
          }}
        >
          AI Dream Decoder
        </Title>
        <Text style={{ color: '#6B6B70', fontSize: 15 }}>
          Describe tu sueño y descubre su significado
        </Text>
      </Space>

      {/* Input area */}
      <Space orientation="vertical" size={4} style={{ width: '100%' }}>
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Estaba volando sobre una ciudad de cristal cuando de repente..."
          autoSize={{ minRows: 4, maxRows: 8 }}
          maxLength={MAX_LENGTH}
          disabled={isLoading}
          style={{
            background: '#16161A',
            borderColor: '#2A2A2E',
            borderRadius: 16,
            color: '#FAFAF9',
            fontSize: 15,
            padding: '14px 16px',
            resize: 'none',
          }}
          aria-label="Descripción del sueño"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 4 }}>
          <Text style={{ fontSize: 12, color: '#6B6B70' }}>
            {trimmed.length < MIN_LENGTH && trimmed.length > 0
              ? `Mínimo ${MIN_LENGTH} caracteres`
              : 'Más detalles = mejor interpretación'}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: charCount > MAX_LENGTH * 0.9 ? '#E85A4F' : '#6B6B70',
            }}
          >
            {charCount}/{MAX_LENGTH}
          </Text>
        </div>
      </Space>

      {/* CTA */}
      <Button
        type="primary"
        size="large"
        block
        disabled={!isValid}
        loading={isLoading}
        onClick={handleSubmit}
        icon={<SparklesIcon size={16} strokeWidth={1.5} />}
        style={{
          height: 56,
          borderRadius: 16,
          fontSize: 16,
          fontWeight: 600,
          background: isValid ? '#6366F1' : undefined,
        }}
      >
        {isLoading ? 'Interpretando...' : 'Interpretar mi sueño'}
      </Button>
    </Space>
  );
}
