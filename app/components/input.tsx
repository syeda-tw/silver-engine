import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ComponentType<{ className?: string }>
  rightIcon?: React.ComponentType<{ className?: string }>
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon: LeftIcon, rightIcon: RightIcon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light">
              <LeftIcon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full h-12 px-4 border rounded-md transition-all
              bg-background text-text
              border-gray-300
              focus:border-primary focus:outline-none focus:shadow-[0px_0px_0px_2px_#2563EB40]
              disabled:opacity-50 disabled:cursor-not-allowed
              placeholder:text-light placeholder:text-base placeholder:leading-6
              ${LeftIcon ? 'pl-12' : ''}
              ${RightIcon ? 'pr-12' : ''}
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {RightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light">
              <RightIcon className="w-5 h-5" />
            </div>
          )}
        </div>
        {error && (
          <p id={`${props.id}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
