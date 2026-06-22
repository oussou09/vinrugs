'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'You do not have permission to view this page.';

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-stone-50">
      <section className="w-full max-w-xl bg-white border border-stone-200 shadow-2xl p-10 sm:p-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 font-bold mb-4">
          Access Restricted
        </p>

        <h1 className="serif text-4xl sm:text-5xl italic text-stone-900 mb-4">
          Unauthorized
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-7 mb-8">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/wp-admin/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-soft"
          >
            Go to Admin Login
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-stone-300 text-stone-700 text-xs font-bold uppercase tracking-widest hover:border-stone-900 hover:text-stone-900 transition-soft"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}