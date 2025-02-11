import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
}

const FallbackComponent = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-white">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 bg-[#E41E12] text-white px-4 py-2 rounded-md hover:bg-[#E41E12]/80 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ fallback, children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent} onReset={() => {}}>{children}</ReactErrorBoundary>
  );
};
