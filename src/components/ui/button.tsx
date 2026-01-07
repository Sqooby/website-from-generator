import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2'

    const variants = {
      primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm hover:shadow-md',
      secondary: 'bg-stone-800 text-white hover:bg-stone-900 shadow-sm hover:shadow-md',
      outline: 'border-2 border-stone-300 text-stone-800 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50',
      ghost: 'text-stone-700 hover:text-rose-600 hover:bg-rose-50',
    }

    const sizes = {
      sm: 'h-9 px-5 text-sm rounded-full',
      md: 'h-11 px-7 text-base rounded-full',
      lg: 'h-14 px-10 text-lg rounded-full tracking-wide',
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
