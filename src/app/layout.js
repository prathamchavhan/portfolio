import { Inter, DM_Mono, Noto_Sans } from 'next/font/google';
import './globals.css';
import GridBackground from '@/components/GridBackground';
import CustomCursor from '@/components/CustomCursor';
import GlobalClickSound from '@/components/GlobalClickSound';
import SmoothScroll from '@/components/SmoothScroll';
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
});

import ReduxProvider from '@/components/ReduxProvider';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata = {
  title: 'Pratham | Portfolio',
  description: 'A modern, dynamic portfolio built with Next.js, Framer Motion, and GSAP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmMono.variable} ${notoSans.variable} ${inter.className} text-white antialiased min-h-screen transition-colors duration-500`} style={{ backgroundColor: '#151515' }}>
        <ReduxProvider>
          <SmoothScroll>
            <GlobalClickSound />
            <CustomCursor />
            <ThemeToggle />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <GridBackground />
              {children}
            </div>
          </SmoothScroll>
        </ReduxProvider>
      </body>
    </html>
  );
}

