import React from 'react';

export interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'gray',
  className = '',
  children,
  icon,
}) => {
  const variantClasses = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    gray: 'badge-gray',
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
