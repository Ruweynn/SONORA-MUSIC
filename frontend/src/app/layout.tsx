import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SONORA Store',
  description: 'A music gear storefront powered by Strapi-ready architecture.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
