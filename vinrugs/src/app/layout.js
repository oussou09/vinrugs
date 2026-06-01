import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ConditionalNavbar from '@/app/ConditionalNavFoot/ConditionalNavbar'
import ConditionalFooter from '@/app/ConditionalNavFoot/ConditionalFooter'
import { AppProvider } from "./lib/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VinRugs",
  description: "website of Buying vintage rugs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppProvider>
          <ConditionalNavbar />
            {children}
          <ConditionalFooter />
        </AppProvider>
      </body>
    </html>
  );
}
