import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
export const metadata: Metadata = {
  title: 'The Kanth Samyuktha Story ♥',
  description: 'Join Chandra Kanth and Samyuktha for their engagement on Thursday, November 12th, 2026 at 10:00 AM at Arya Vysya Function Hall, Gopalpet, Medak, Telangana.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
