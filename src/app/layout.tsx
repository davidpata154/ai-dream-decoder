import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import { AntdProvider } from '@/components/providers/AntdProvider';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Dream Decoder — Interpreta tus sueños',
  description:
    'Descubre el significado oculto de tus sueños con inteligencia artificial. ' +
    'Genera una imagen artística y una interpretación personalizada al instante.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
