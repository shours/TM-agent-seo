import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ResumeProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectName: string) => void;
}

const ResumeProjectModal = ({ isOpen, onClose, onSubmit }: ResumeProjectModalProps) => {
  const [projectName, setProjectName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(projectName);
    setProjectName('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du projet
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reprendre le projet
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResumeProjectModal;