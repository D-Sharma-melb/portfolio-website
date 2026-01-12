'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="p-2 rounded-full transition-all duration-200 group hover:bg-pine"
      aria-label="Go back"
    >
      <ArrowLeft className="w-6 h-6 text-moss group-hover:text-white transition-colors" />
    </button>
  );
}
