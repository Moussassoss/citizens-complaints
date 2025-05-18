import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface AlertProps {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-700',
      icon: <Info className="h-5 w-5 text-blue-400" />,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-700',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      icon: <AlertCircle className="h-5 w-5 text-yellow-400" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700',
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
    },
  };

  const variantStyles = variants[variant];

  return (
    <div
      className={`
        rounded-md border-l-4 p-4 mb-4
        ${variantStyles.bg}
        ${variantStyles.border}
        ${className}
      `}
    >
      <div className="flex">
        <div className="flex-shrink-0">{variantStyles.icon}</div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${variantStyles.text}`}>{title}</h3>
          )}
          <div className={`text-sm ${variantStyles.text}`}>{message}</div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`
                  inline-flex rounded-md p-1.5
                  ${variantStyles.bg}
                  ${variantStyles.text}
                  hover:opacity-75
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-blue-500
                `}
                onClick={onDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;