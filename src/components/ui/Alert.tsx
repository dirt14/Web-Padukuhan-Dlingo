import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const variantClasses = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    danger: 'alert-danger',
  };

  const icons = {
    info: <Info className="h-5 w-5 flex-shrink-0" />,
    success: <CheckCircle2 className="h-5 w-5 flex-shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" />,
    danger: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {icons[variant]}
      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
