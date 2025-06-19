import React from 'react';

export default function Card({
  title,
  description,
  icon,
  footer,
  className = '',
  children,
}) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          {title && <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>}
          {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        {icon && <div className="text-gray-400 dark:text-gray-300">{icon}</div>}
      </div>

      {children && (
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {children}
        </div>
      )}

      {footer && (
        <div className="mt-4 border-t pt-3 border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          {footer}
        </div>
      )}
    </div>
  );
}
