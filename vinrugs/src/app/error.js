'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ERRORS = {
  '400': 'The server did not understand the request.',
  '401': 'The requested page needs a username and a password.',
  '403': 'Access is forbidden to the requested page.',
  '405': 'The method specified in the request is not allowed.',
  '418': 'Attempt to brew coffee with a teapot is not supported.',
  '500': 'The server met an unexpected condition.',
  '503': 'The server is temporarily overloading or down.',
};

export default function Error({ error, reset }) {
  // Extract error code if available, otherwise default to 500
  const digest = error?.digest || '';
  const statusCode = Object.keys(ERRORS).find(code => digest.includes(code)) || '500';
  const message = ERRORS[statusCode];

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black relative font-mono">
      <div className="absolute inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(180deg,rgba(0,0,0,0)_0,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0)_100%)] bg-[length:auto_4px]"></div>
      
      <main className="relative z-10 h-full w-full max-w-[1000px] p-16 uppercase">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl mb-8 text-[rgba(128,255,128,0.8)]"
          style={{ textShadow: '0 0 11px rgba(51, 255, 51, 1)' }}
        >
          Error <span className="text-white">{statusCode}</span>
        </motion.h1>
        
        <motion.p className="text-2xl mb-4 text-[rgba(128,255,128,0.8)] before:content-['>_']">
          {message}
        </motion.p>
        
        <div className="flex gap-6 mt-12">
          <button 
            onClick={() => reset()}
            className="text-white text-xl hover:text-green-400 border border-white px-2 cursor-pointer bg-transparent"
          >
            [Retry Connection]
          </button>
          <a href="/" className="text-white text-xl hover:text-green-400 border border-white px-2">
            [Go Home]
          </a>
        </div>
      </main>

      <style jsx global>{`
        body { background-color: #000; background-image: radial-gradient(#11581E, #041607); }
      `}</style>
    </div>
  );
}