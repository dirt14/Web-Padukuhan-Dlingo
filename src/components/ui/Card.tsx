import React from 'react';

export interface CardProps {
  variant?: 'default' | 'hover' | 'flat' | 'elevated' | 'interactive';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, onClick }, ref) => {
    const variantClasses = {
      default: 'card',
      hover: 'card-hover',
      flat: 'card-flat',
      elevated: 'card-elevated',
      interactive: 'card-interactive',
    };

    return (
      <div
        ref={ref}
        className={`${variantClasses[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className = '',
  children,
}) => {
  return <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>{children}</div>;
};

export interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({
  className = '',
  children,
}) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
