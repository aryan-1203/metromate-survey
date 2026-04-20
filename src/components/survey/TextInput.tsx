'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const baseClass =
  'w-full font-sans text-stone-800 bg-white border border-stone-200 rounded-xl px-4 py-3 text-base placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-150 resize-none';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <input
          ref={ref}
          className={cn(baseClass, error && 'border-red-300 focus:ring-red-400', className)}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-sans">{error}</p>
        )}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <textarea
          ref={ref}
          rows={rows}
          className={cn(baseClass, error && 'border-red-300 focus:ring-red-400', className)}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-sans">{error}</p>
        )}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';
