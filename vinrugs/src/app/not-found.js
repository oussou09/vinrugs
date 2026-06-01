'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="h-[60vh] pt-[50px] w-full overflow-hidden bg-black relative font-mono">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(180deg,rgba(0,0,0,0)_0,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0)_100%)] bg-[length:auto_4px]"></div>
      
      <main className="relative z-10 h-full w-full max-w-[1000px] p-16 uppercase">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl mb-8 text-[rgba(128,255,128,0.8)]"
          style={{ textShadow: '0 0 11px rgba(51, 255, 51, 1)' }}
        >
          Error <span className="text-white">404</span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl mb-4 text-[rgba(128,255,128,0.8)] before:content-['>_']"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The server can not find the requested page.
        </motion.p>
        
        <motion.p 
          className="text-2xl mb-12 text-[rgba(128,255,128,0.8)] before:content-['>_']"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Good luck.
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
        >
          <a href="/" className="text-white text-xl hover:text-green-400 transition-colors border border-white px-2">
            [Go to homepage]
          </a>
        </motion.div>
      </main>

      <style jsx global>{`
        body { background-color: #000; background-image: radial-gradient(#11581E, #041607); }
      `}</style>
    </div>
  );
}