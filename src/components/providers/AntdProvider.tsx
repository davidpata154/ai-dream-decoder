'use client';

import React from 'react';
import { ConfigProvider, theme } from 'antd';

const dreamTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#6366F1',
    colorBgBase: '#0B0B0E',
    colorBgContainer: '#16161A',
    colorBgElevated: '#1A1A1E',
    colorText: '#FAFAF9',
    colorTextSecondary: '#8E8E93',
    colorTextTertiary: '#6B6B70',
    colorBorder: '#2A2A2E',
    colorBorderSecondary: '#3A3A40',
    colorSuccess: '#32D583',
    colorError: '#E85A4F',
    borderRadius: 8,
    borderRadiusLG: 16,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    controlHeight: 40,
    motionDurationMid: '0.2s',
  },
  components: {
    Card: {
      paddingLG: 20,
      boxShadowCard: '0 4px 24px rgba(0,0,0,0.4)',
    },
    Input: {
      activeShadow: '0 0 0 2px rgba(99,102,241,0.3)',
    },
    Button: {
      fontWeight: 600,
    },
    Alert: {
      borderRadiusLG: 12,
    },
  },
};

interface AntdProviderProps {
  children: React.ReactNode;
}

export function AntdProvider({ children }: AntdProviderProps) {
  return <ConfigProvider theme={dreamTheme}>{children}</ConfigProvider>;
}
