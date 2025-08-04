import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div 
      className={cn(
        'bg-white rounded-2xl shadow-lg border border-gray-100',
        hover && 'hover:shadow-2xl transition-all duration-500 transform hover:scale-105',
        className
      )}
    >
      {children}
    </div>
  );
}