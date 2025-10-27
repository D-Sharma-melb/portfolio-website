'use client';

import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: 'default' | 'sage';
}

export default function Chip({ label, onRemove, variant = 'default' }: ChipProps) {
  const variants = {
    default: 'bg-cream text-pine hover:bg-cream-dark',
    sage: 'bg-sage-light/30 text-forest hover:bg-sage-light/50',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${variants[variant]}`}>
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-pine/20 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
