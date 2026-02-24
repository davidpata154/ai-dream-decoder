# AI Dream Decoder — Design System

This document defines the visual design system for the AI Dream Decoder app. It serves as the authoritative reference for the [DEV] agent when implementing UI components with Ant Design v5.

---

## 1. Color Palette

| Token Name         | Hex Value   | Usage                                                         |
|--------------------|-------------|---------------------------------------------------------------|
| `bg-base`          | `#0B0B0E`   | App background, page root                                     |
| `surface-card`     | `#16161A`   | Primary card / panel surface                                  |
| `surface-card-alt` | `#1A1A1E`   | Secondary card, nested panels, input backgrounds              |
| `accent-primary`   | `#6366F1`   | Primary actions: buttons, links, focus rings, active states   |
| `accent-success`   | `#32D583`   | Success states, positive indicators, dream interpretation OK  |
| `accent-error`     | `#E85A4F`   | Error states, validation messages, destructive actions        |
| `text-primary`     | `#FAFAF9`   | Headings, primary body copy, labels                           |
| `text-secondary`   | `#8E8E93`   | Placeholders, captions, helper text, metadata                 |
| `text-muted`       | `#6B6B70`   | Disabled text, de-emphasized annotations                      |
| `border-subtle`    | `#2A2A30`   | Card borders, dividers, input strokes (derived, not in spec)  |

### Color Usage Guidelines

- Never place `text-muted` on `bg-base` for anything other than decorative text; use `text-secondary` as the minimum readable contrast.
- Use `accent-primary` exclusively for interactive affordances to preserve its signal value.
- `accent-success` and `accent-error` are reserved for semantic feedback — do not use them for decoration.

---

## 2. Typography

### Font Families

| Role      | Family        | Classification    | Import                                              |
|-----------|---------------|-------------------|-----------------------------------------------------|
| Titles    | **Fraunces**  | Serif (variable)  | Google Fonts — `weights: 400, 600, 700`             |
| Body      | **DM Sans**   | Geometric sans    | Google Fonts — `weights: 400, 500, 600`             |
| Monospace | `monospace`   | System fallback   | Used only for code snippets or raw AI output        |

### Type Scale

| Name            | Font      | Size (px / rem) | Weight | Line Height | Usage                              |
|-----------------|-----------|-----------------|--------|-------------|------------------------------------|
| `display`       | Fraunces  | 40 / 2.5rem     | 700    | 1.15        | Hero section heading               |
| `h1`            | Fraunces  | 32 / 2rem       | 700    | 1.2         | Page titles                        |
| `h2`            | Fraunces  | 24 / 1.5rem     | 600    | 1.25        | Section headings                   |
| `h3`            | Fraunces  | 20 / 1.25rem    | 600    | 1.3         | Card titles, panel headings        |
| `body-lg`       | DM Sans   | 17 / 1.0625rem  | 400    | 1.6         | Dream description textarea         |
| `body`          | DM Sans   | 15 / 0.9375rem  | 400    | 1.6         | Default body copy, AI response     |
| `body-sm`       | DM Sans   | 13 / 0.8125rem  | 400    | 1.5         | Helper text, metadata, timestamps  |
| `label`         | DM Sans   | 13 / 0.8125rem  | 500    | 1.4         | Input labels, button text (sm)     |
| `button`        | DM Sans   | 15 / 0.9375rem  | 600    | 1.0         | Primary / secondary button text    |

### Google Fonts Import (Next.js `layout.tsx`)

```tsx
import { Fraunces, DM_Sans } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});
```

Apply both variables to `<html className={`${fraunces.variable} ${dmSans.variable}`}>`.

---

## 3. Spacing & Shape

| Property       | Value      | Usage                                      |
|----------------|------------|--------------------------------------------|
| Border radius  | `16px`     | Standard cards, panels                     |
| Border radius  | `20px`     | Featured / hero cards                      |
| Border radius  | `12px`     | Inputs, textareas                          |
| Border radius  | `8px`      | Buttons (default), tags, badges            |
| Border radius  | `50%`      | Avatar circles                             |
| Icon size (sm) | `16px`     | Inline icons, input adornments             |
| Icon size (md) | `20px`     | Button icons, list item icons              |
| Icon size (lg) | `24px`     | Section icons, feature highlights          |
| Icon library   | Lucide     | Outline style only — `lucide-react` pkg    |

---

## 4. Ant Design v5 — Theme Token Mapping

This section maps the design system colors and shapes to Ant Design `ConfigProvider` theme tokens.

### Global Token Mapping

| Ant Design Token          | Design System Value | Notes                                         |
|---------------------------|---------------------|-----------------------------------------------|
| `colorPrimary`            | `#6366F1`           | Accent primary — buttons, links, focus rings  |
| `colorSuccess`            | `#32D583`           | Success feedback                              |
| `colorError`              | `#E85A4F`           | Error states and alerts                       |
| `colorWarning`            | `#F59E0B`           | Warnings (amber; not in core palette)         |
| `colorBgBase`             | `#0B0B0E`           | Root background                               |
| `colorBgContainer`        | `#16161A`           | Card / modal surface                          |
| `colorBgElevated`         | `#1A1A1E`           | Dropdowns, popovers, nested panels            |
| `colorBgLayout`           | `#0B0B0E`           | Layout sider / header background              |
| `colorText`               | `#FAFAF9`           | Primary text                                  |
| `colorTextSecondary`      | `#8E8E93`           | Secondary / description text                  |
| `colorTextDisabled`       | `#6B6B70`           | Disabled / muted text                         |
| `colorTextPlaceholder`    | `#6B6B70`           | Input placeholder text                        |
| `colorBorder`             | `#2A2A30`           | Default borders and dividers                  |
| `colorBorderSecondary`    | `#222228`           | Subtle dividers inside cards                  |
| `borderRadius`            | `8`                 | Base radius (px) for buttons, tags            |
| `borderRadiusLG`          | `16`                | Large radius for cards and modals             |
| `borderRadiusSM`          | `6`                 | Small radius for compact elements             |
| `fontFamily`              | `'DM Sans', sans-serif` | Body font for all component text          |
| `fontSize`                | `15`                | Base font size (px)                           |
| `fontSizeLG`              | `17`                | Large font size                               |
| `fontSizeSM`              | `13`                | Small font size                               |
| `lineHeight`              | `1.6`               | Default line height                           |
| `controlHeight`           | `44`                | Standard input / button height                |
| `controlHeightLG`         | `52`                | Large control height                          |
| `motionDurationMid`       | `0.2s`              | Standard transition duration                  |
| `wireframe`               | `false`             | Disable wireframe mode                        |

---

## 5. Components Guide

### 5.1 Button

| Variant    | Ant Design `type` | Usage                                 |
|------------|-------------------|---------------------------------------|
| Primary    | `primary`         | Main CTA — "Interpret my dream"       |
| Default    | `default`         | Secondary actions — "Clear", "Back"   |
| Text       | `text`            | Navigation links, subtle actions      |
| Danger     `danger` prop       | Destructive actions                   |

**States:**
- `default`: Indigo fill (`#6366F1`), white text, 8px radius
- `loading`: Add `loading={true}` — shows Spin inside button, reduced opacity cursor
- `disabled`: Muted background, `text-muted` color, `cursor: not-allowed`

**Example:**
```tsx
<Button type="primary" size="large" loading={isLoading} icon={<Sparkles size={16} />}>
  Interpret My Dream
</Button>
```

---

### 5.2 Input.TextArea

Used for the primary dream description input.

**States:**
- `default`: `#1A1A1E` background, `#2A2A30` border, `#FAFAF9` text
- `focused`: `#6366F1` border (2px), subtle indigo glow via `box-shadow`
- `error`: `#E85A4F` border, error message below via `Form.Item`
- `disabled`: Reduced opacity, `#6B6B70` text

**Example:**
```tsx
<Input.TextArea
  placeholder="Describe your dream in as much detail as you remember..."
  autoSize={{ minRows: 5, maxRows: 12 }}
  maxLength={2000}
  showCount
  status={hasError ? 'error' : undefined}
/>
```

---

### 5.3 Card

| Property       | Value         |
|----------------|---------------|
| Background     | `#16161A`     |
| Border         | `1px solid #2A2A30` |
| Border radius  | `16px`        |
| Padding        | `24px`        |
| Shadow         | `0 4px 24px rgba(0,0,0,0.4)` |

**States:**
- `default`: Static display
- `loading`: Wrap content in `<Skeleton active />` while AI processes
- `result`: Reveal content with fade-in animation after response

**Example:**
```tsx
<Card
  title={<Typography.Title level={3}>Dream Interpretation</Typography.Title>}
  style={{ background: '#16161A', borderColor: '#2A2A30', borderRadius: 16 }}
>
  {isLoading ? <Skeleton active paragraph={{ rows: 6 }} /> : <InterpretationContent />}
</Card>
```

---

### 5.4 Spin

Used as a standalone loading indicator during AI inference.

**Example:**
```tsx
<Spin size="large" tip="Interpreting your dream..." />
```

Customize with `indicator` prop using a Lucide icon wrapped in an Antd wrapper if needed.

---

### 5.5 Alert

| Semantic  | `type` prop | Color token    | Usage                            |
|-----------|-------------|----------------|----------------------------------|
| Success   | `success`   | `#32D583`      | Interpretation complete          |
| Error     | `error`     | `#E85A4F`      | API failure, validation error    |
| Info      | `info`      | `#6366F1`      | Usage limits, informational tips |
| Warning   | `warning`   | `#F59E0B`      | Rate limit approaching           |

**Example:**
```tsx
<Alert
  type="error"
  message="Interpretation failed"
  description="We could not connect to the AI service. Please try again."
  showIcon
  closable
/>
```

---

### 5.6 Typography

Use Ant Design `Typography` for semantic text rendering with theme tokens applied automatically.

```tsx
import { Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;

<Title level={1}>Your Dream, Decoded</Title>
<Paragraph type="secondary">Enter a dream to begin your interpretation.</Paragraph>
<Text type="danger">Session expired. Please sign in again.</Text>
```

Map `level` to the type scale:
- `level={1}` → `h1` (32px Fraunces 700)
- `level={2}` → `h2` (24px Fraunces 600)
- `level={3}` → `h3` (20px Fraunces 600)

---

### 5.7 Space

Use `Space` to manage consistent gaps between inline elements. Prefer Ant Design `Space` over raw CSS `gap` for component-level layouts.

```tsx
<Space direction="vertical" size={16} style={{ width: '100%' }}>
  <Input.TextArea ... />
  <Button type="primary" block>Interpret My Dream</Button>
</Space>
```

---

## 6. ConfigProvider — Complete Dark Theme Setup

Place this at the root of the application (`app/layout.tsx` or `app/providers.tsx`).

```tsx
'use client';

import { ConfigProvider, theme } from 'antd';
import type { ThemeConfig } from 'antd';

const dreamDecoderTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Brand colors
    colorPrimary: '#6366F1',
    colorSuccess: '#32D583',
    colorError: '#E85A4F',
    colorWarning: '#F59E0B',

    // Backgrounds
    colorBgBase: '#0B0B0E',
    colorBgContainer: '#16161A',
    colorBgElevated: '#1A1A1E',
    colorBgLayout: '#0B0B0E',

    // Text
    colorText: '#FAFAF9',
    colorTextSecondary: '#8E8E93',
    colorTextDisabled: '#6B6B70',
    colorTextPlaceholder: '#6B6B70',

    // Borders
    colorBorder: '#2A2A30',
    colorBorderSecondary: '#222228',

    // Shape
    borderRadius: 8,
    borderRadiusLG: 16,
    borderRadiusSM: 6,

    // Typography
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 15,
    fontSizeLG: 17,
    fontSizeSM: 13,
    lineHeight: 1.6,

    // Controls
    controlHeight: 44,
    controlHeightLG: 52,

    // Motion
    motionDurationMid: '0.2s',

    // Misc
    wireframe: false,
  },
  components: {
    Card: {
      colorBgContainer: '#16161A',
      borderRadiusLG: 16,
      paddingLG: 24,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
    },
    Input: {
      colorBgContainer: '#1A1A1E',
      borderRadius: 12,
      activeBorderColor: '#6366F1',
      activeShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
    },
    Button: {
      primaryShadow: 'none',
      borderRadius: 8,
      fontWeight: 600,
    },
    Alert: {
      borderRadius: 12,
    },
    Typography: {
      titleMarginBottom: '0.5em',
      titleMarginTop: 0,
    },
  },
};

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={dreamDecoderTheme}>
      {children}
    </ConfigProvider>
  );
}
```

### Usage in `app/layout.tsx`

```tsx
import { AntdProvider } from '@/components/providers/AntdProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
```

---

## 7. CSS Custom Properties

Define these in `app/globals.css` for use outside Ant Design components (e.g., custom `className` overrides):

```css
:root {
  --color-bg-base: #0B0B0E;
  --color-surface-card: #16161A;
  --color-surface-card-alt: #1A1A1E;
  --color-accent-primary: #6366F1;
  --color-accent-success: #32D583;
  --color-accent-error: #E85A4F;
  --color-text-primary: #FAFAF9;
  --color-text-secondary: #8E8E93;
  --color-text-muted: #6B6B70;
  --color-border: #2A2A30;

  --font-title: var(--font-fraunces), Georgia, serif;
  --font-body: var(--font-dm-sans), -apple-system, BlinkMacSystemFont, sans-serif;

  --radius-card: 16px;
  --radius-card-lg: 20px;
  --radius-input: 12px;
  --radius-button: 8px;
}
```

---

## 8. Icon Usage

All icons must use **Lucide React** in outline style. Never mix with Ant Design icons.

```bash
npm install lucide-react
```

```tsx
import { Moon, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

// Standard sizing
<Moon size={20} strokeWidth={1.5} />

// In a button
<Button type="primary" icon={<Sparkles size={16} strokeWidth={1.5} />}>
  Interpret
</Button>
```

### Icon Size Convention

| Context           | Size   | `strokeWidth` |
|-------------------|--------|---------------|
| Inline / label    | 16px   | 1.5           |
| Button / list     | 20px   | 1.5           |
| Section / feature | 24px   | 1.5           |
| Hero / display    | 32px   | 1.25          |

---

## 9. Component State Summary

| Component       | Default                        | Loading                           | Error                                  |
|-----------------|--------------------------------|-----------------------------------|----------------------------------------|
| `Button`        | Indigo fill, white text        | `loading={true}`, spinner inside  | `danger` prop + `#E85A4F` color        |
| `Input.TextArea`| Dark bg, subtle border         | `disabled` with skeleton above    | `status="error"`, red border           |
| `Card`          | Dark surface, subtle border    | `<Skeleton active />` inside      | Wrap with `<Alert type="error" />`     |
| `Spin`          | N/A                            | Full size with `tip` prop         | Not applicable                         |
| `Alert`         | Contextual semantic color      | Not applicable                    | `type="error"` with description        |

---

*Document version 1.0 — Created 2026-02-24 by [UI] Agent.*
