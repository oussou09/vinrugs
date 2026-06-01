
"use client"; // هذا الملف هو الوحيد الذي سيكون Client

import { usePathname } from 'next/navigation';
import Navbar from '@/app/navbar'; // المكون الأصلي للنافبار

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // إذا كان المسار يبدأ بـ wp-admin، لا تظهر شيئاً
  if (pathname.startsWith('/wp-admin')) {
    return null;
  }

  return <Navbar />;
}