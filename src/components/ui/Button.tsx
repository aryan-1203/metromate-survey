'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-sans font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default:
          'bg-stone-900 text-stone-50 hover:bg-stone-800 active:bg-stone-900',
        outline:
          'border border-stone-300 bg-transparent text-stone-700 hover:bg-stone-100 hover:border-stone-400',
        ghost:
          'text-stone-600 hover:bg-stone-100 hover:text-stone-900',
        secondary:
          'bg-stone-100 text-stone-800 hover:bg-stone-200',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-full',
        md: 'h-11 px-6 text-base rounded-full',
        lg: 'h-14 px-8 text-lg rounded-full',
        xl: 'h-16 px-10 text-xl rounded-full',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> &
  HTMLMotionProps<'button'> & {
    className?: string;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
