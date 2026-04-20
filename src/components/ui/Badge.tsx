import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'muted';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-medium tracking-wide',
        {
          'bg-stone-900 text-stone-50': variant === 'default',
          'border border-stone-300 text-stone-600 bg-transparent': variant === 'outline',
          'bg-stone-100 text-stone-600': variant === 'muted',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
