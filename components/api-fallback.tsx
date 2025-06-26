'use client';

import { motion } from 'framer-motion';

interface ApiFallbackProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

export default function ApiFallback({ 
  title = "Service Temporarily Unavailable", 
  message = "We're experiencing some technical difficulties. Please try again later.",
  showRetry = false,
  onRetry
}: ApiFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center"
    >
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-holicraft-cream rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-playfair font-semibold text-holicraft-black mb-2">
            {title}
          </h2>
          <p className="text-body-md text-holicraft-gray-dark">
            {message}
          </p>
        </div>
        
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
} 