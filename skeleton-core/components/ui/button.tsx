'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-background',
          'disabled:opacity-50 disabled:pointer-events-none',
          'active:scale-95',
          {
            'bg-accent-purple text-text-primary hover:bg-accent-purple/90 hover:shadow-[0_0_20px_rgba(157,91,210,0.4)]':
              variant === 'default',
            'border border-border hover:border-accent-purple hover:bg-accent-purple/5 text-text-primary':
              variant === 'outline',
            'bg-accent-red text-text-primary hover:bg-accent-red/90 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]':
              variant === 'destructive',
            'hover:bg-surface text-text-primary hover:text-accent-purple': variant === 'ghost',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-8 px-3 text-sm': size === 'sm',
            'h-12 px-6': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
