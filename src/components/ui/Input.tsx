import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helper,
      required = false,
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success;

    const inputClasses = hasError
      ? 'input-error'
      : hasSuccess
      ? 'input-success'
      : 'input';

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`label ${required ? 'label-required' : ''}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`${inputClasses} ${leftIcon ? 'pl-10' : ''} ${
              rightIcon || hasError || hasSuccess ? 'pr-10' : ''
            }`}
            {...props}
          />

          {rightIcon && !hasError && !hasSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}

          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-danger-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}

          {hasSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          )}
        </div>

        {helper && !error && !success && (
          <p className="form-helper">{helper}</p>
        )}

        {error && (
          <p className="form-error">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </p>
        )}

        {success && (
          <p className="text-sm text-success-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>{success}</span>
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
