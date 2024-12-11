import React from 'react';
import { Pencil, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultProps {
  content: string;
  analysis: string | null;
  isEditing: boolean;
  keyword?: string | null;
  language?: string | null;
  serpamicsId?: string | null;
  projectName?: string | null;
  onEdit: () => void;
  onSave: (content: string) => void;
}

const AnalysisResult = ({ 
  content, 
  analysis,
  isEditing, 
  keyword,
  language,
  serpamicsId,
  projectName,
  onEdit, 
  onSave 
}: AnalysisResultProps) => {
  const [editedContent, setEditedContent] = React.useState(content);

  React.useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = () => {
    onSave(editedContent);
  };

  const getLanguageDisplay = (lang: string | null | undefined) => {
    if (!lang) return '';
    return lang === 'fr' ? 'Français' : 'English';
  };

  const metadata = `Mot clef: ${keyword || ''} | Langue: ${getLanguageDisplay(language)}${serpamicsId ? ` | ID serpmantics: ${serpamicsId}` : ''}${projectName ? ` | Projet: ${projectName}` : ''}`;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-4">
          <p className="text-sm text-gray-500">{metadata}</p>
        </div>
        
        {analysis && (
          <>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Analyse de l'intention</h3>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-base text-gray-900 leading-relaxed">
                {analysis}
              </pre>
            </div>
          </>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Brief de rédaction</h3>
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
        </div>

        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-[600px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
          />
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResult;