import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
export const metadata: Metadata = {
  title: 'The Story of Kanth ♥ Samyuktha',
  description: 'Join Chandra Kanth and Samyuktha for their engagement on Thursday, 12 November 2026 at 10:30 AM in Gopalraopet, Medak, Telangana.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
