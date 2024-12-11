import React from 'react';
import { useForm } from 'react-hook-form';
import { Pencil, Save } from 'lucide-react';

interface ResumeWritingFormData {
  persona: string;
  tone: string;
}

interface ResumeWritingSectionProps {
  projectName: string;
  onSubmit: (data: ResumeWritingFormData) => Promise<void>;
  isLoading: boolean;
  content?: string | null;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: (content: string) => void;
}

const ResumeWritingSection = ({
  projectName,
  onSubmit,
  isLoading,
  content,
  isEditing,
  onEdit,
  onSave
}: ResumeWritingSectionProps) => {
  const { register, handleSubmit } = useForm<ResumeWritingFormData>();
  const [editedContent, setEditedContent] = React.useState(content || '');

  React.useEffect(() => {
    if (content) {
      setEditedContent(content);
    }
  }, [content]);

  const handleSave = () => {
    if (onSave) {
      onSave(editedContent);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Reprendre la rédaction</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Persona
            </label>
            <textarea
              {...register('persona')}
              placeholder="qui parle à qui"
              className="w-full h-32 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Ton
            </label>
            <textarea
              {...register('tone')}
              placeholder="description du style"
              className="w-full h-32 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-md h-14 flex justify-center items-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Génération en cours..." : "Lancer la nouvelle rédaction"}
          </button>
        </div>
      </form>

      {content && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Rédaction</h3>
            {onEdit && onSave && (
              <div className="flex space-x-2">
                {!isEditing ? (
                  <button
                    onClick={onEdit}
                    className="inline-flex items-center px-3 py-1.5 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Éditer
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Enregistrer
                  </button>
                )}
              </div>
            )}
          </div>

          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-[600px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm whitespace-pre"
            />
          ) : (
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-base text-gray-900">
                {editedContent}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeWritingSection;