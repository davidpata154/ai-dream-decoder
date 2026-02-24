'use client';

import React from 'react';
import { Button, Card, Space, Tag, Typography } from 'antd';
import { ArrowLeftIcon, BrainCircuitIcon, RefreshCwIcon, Share2Icon } from 'lucide-react';
import type { DreamInterpretation } from '@/domain/entities/Dream';

const { Title, Text, Paragraph } = Typography;

interface DreamResultProps {
  result: DreamInterpretation;
  onReset: () => void;
}

const TAG_COLORS = ['#6366F1', '#32D583', '#E85A4F'];

export function DreamResult({ result, onReset }: DreamResultProps) {
  return (
    <Space
      orientation="vertical"
      size={16}
      style={{
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        padding: '24px 24px 48px',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button
          type="text"
          icon={<ArrowLeftIcon size={20} strokeWidth={1.5} />}
          onClick={onReset}
          style={{ color: '#6B6B70', padding: 0 }}
          aria-label="Volver"
        />
        <Text
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 600,
            color: '#FAFAF9',
            fontSize: 16,
          }}
        >
          Interpretación
        </Text>
      </div>

      {/* Dream image */}
      <Card
        styles={{ body: { padding: 0 } }}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: 'none',
          background: '#16161A',
          aspectRatio: '16/9',
        }}
      >
        <img
          src={result.imageUrl}
          alt="Representación artística de tu sueño"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </Card>

      {/* Interpretation card */}
      <Card
        style={{
          background: '#16161A',
          border: '1px solid #2A2A2E',
          borderRadius: 16,
        }}
      >
        <Space orientation="vertical" size={12} style={{ width: '100%' }}>
          {/* Card header */}
          <Space size={10} align="center">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#1A1A1E',
              }}
            >
              <BrainCircuitIcon size={18} color="#6366F1" strokeWidth={1.5} />
            </div>
            <Title
              level={5}
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                color: '#FAFAF9',
                marginBottom: 0,
                fontSize: 18,
              }}
            >
              Tu interpretación
            </Title>
          </Space>

          {/* Interpretation text */}
          <Paragraph
            style={{
              color: '#8E8E93',
              fontSize: 14,
              lineHeight: 1.7,
              marginBottom: 0,
            }}
          >
            {result.interpretation}
          </Paragraph>

          {/* Tags */}
          {result.tags.length > 0 && (
            <Space size={8} wrap>
              {result.tags.map((tag, idx) => (
                <Tag
                  key={tag}
                  style={{
                    background: `${TAG_COLORS[idx % TAG_COLORS.length]}20`,
                    border: `1px solid ${TAG_COLORS[idx % TAG_COLORS.length]}40`,
                    color: TAG_COLORS[idx % TAG_COLORS.length],
                    borderRadius: 20,
                    padding: '2px 12px',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          )}
        </Space>
      </Card>

      {/* Actions */}
      <Space orientation="vertical" size={8} style={{ width: '100%' }}>
        <Button
          block
          size="large"
          icon={<RefreshCwIcon size={16} strokeWidth={1.5} />}
          onClick={onReset}
          style={{
            height: 52,
            borderRadius: 16,
            background: '#1A1A1E',
            borderColor: '#3A3A40',
            color: '#FAFAF9',
            fontWeight: 600,
          }}
        >
          Nueva interpretación
        </Button>

        <Button
          type="text"
          block
          icon={<Share2Icon size={14} strokeWidth={1.5} />}
          style={{ color: '#6B6B70', fontSize: 13 }}
        >
          Compartir
        </Button>
      </Space>
    </Space>
  );
}
