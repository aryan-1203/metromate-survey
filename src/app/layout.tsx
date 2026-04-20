import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MetroMate — Find your flatmate. No broker. No drama.',
  description:
    'MetroMate matches you with compatible flatmates in Pune, Mumbai, Bengaluru and beyond. No broker fees. Smart compatibility filters.',
  openGraph: {
    title: 'MetroMate — Find your flatmate. No broker. No drama.',
    description: 'Broker-free flatmate matching for Indian metro cities.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-stone-50 text-stone-900 antialiased">{children}</body>
    </html>
  );
}
