import { Inter, DM_Mono, Noto_Sans, Edu_TAS_Beginner } from 'next/font/google';
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

const eduTas = Edu_TAS_Beginner({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-edu-tas',
});

export const metadata = {
  title: 'Pratham | Portfolio',
  description: 'A modern, dynamic portfolio built with Next.js, Framer Motion, and GSAP.',
};

export const viewport = {
  width: 1440,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          @media screen and (max-width: 1439px) {
            html {
               zoom: calc(100vw / 1440);
            }
            body {
               min-width: 1440px;
            }
          }
        `}} />
      </head>
      <body className={`${inter.variable} ${dmMono.variable} ${notoSans.variable} ${eduTas.variable} ${inter.className} text-white antialiased min-h-screen transition-colors duration-500`} style={{ backgroundColor: '#151515' }}>
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

