import React from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'title' | 'avatar' | 'card' | 'custom';
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'custom',
  className = '',
  width,
  height,
}) => {
  const variantClasses = {
    text: 'skeleton-text',
    title: 'skeleton-title',
    avatar: 'skeleton-avatar',
    card: 'skeleton-card',
    custom: 'skeleton',
  };

  const style = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return <div className={`${variantClasses[variant]} ${className}`} style={style} />;
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className="p-6 space-y-4">
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number; className?: string }> = ({
  rows = 5,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton height="40px" className="rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height="60px" className="rounded-lg" />
      ))}
    </div>
  );
};

export default Skeleton;
