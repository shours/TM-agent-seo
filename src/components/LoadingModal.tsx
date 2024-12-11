import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
  isWritingGeneration?: boolean;
}

const LoadingModal = ({ 
  isOpen, 
  isWritingGeneration,
  message = isWritingGeneration 
    ? "La génération de votre contenu est en cours, cela peut prendre jusqu'à 3 minutes..."
    : "Votre analyse arrive bientôt, ça peut prendre quelques instants"
}: LoadingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-700 text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;