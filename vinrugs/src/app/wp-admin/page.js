

// app/wp-admin/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppAdmin } from "@/context/AppContextAdmin"; // adjust path

export default function AdminPage() {
  const router = useRouter();
  const { adminToken } = useAppAdmin();

  useEffect(() => {
    if (adminToken) {
      router.replace("/wp-admin/dashboard");
    } else {
      router.replace("/wp-admin/login");
    }
  }, [adminToken, router]);

  return null;
}