import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResult from './components/AnalysisResult';
import WritingSection from './components/WritingSection';
import ResumeWritingSection from './components/ResumeWritingSection';
import LoadingModal from './components/LoadingModal';
import LoginModal from './components/LoginModal';
import ExportNotification from './components/ExportNotification';
import ResumeProjectModal from './components/ResumeProjectModal';
import Logo from './components/Logo';
import { useAnalysis } from './hooks/useAnalysis';
import { useWriting } from './hooks/useWriting';
import { useAuth } from './hooks/useAuth';
import { exportContent } from './services/exportService';
import { generateResumeWriting } from './services/resumeWritingService';

function App() {
  const { state: analysisState, handleSubmit, handleEdit, handleSave } = useAnalysis();
  const { state: writingState, handleSubmit: handleWritingSubmit, handleEdit: handleWritingEdit, handleSave: handleWritingSave } = useWriting();
  const { state: authState, handleLogin, handleLogout } = useAuth();

  const [showExportNotification, setShowExportNotification] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeProjectName, setResumeProjectName] = useState<string | null>(null);
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const [isResumeEditing, setIsResumeEditing] = useState(false);
  const [isResumeLoading, setIsResumeLoading] = useState(false);

  const handleWritingFormSubmit = async ({ persona, tone }: { persona: string; tone: string }) => {
    if (!analysisState.analysis || !analysisState.result || !analysisState.serpamicsId) return;
    
    await handleWritingSubmit(
      analysisState.analysis,
      analysisState.result,
      analysisState.serpamicsId,
      persona,
      tone,
      analysisState.uniqueId,
      analysisState.projectName
    );
  };

  const handleWritingSaveWrapper = (content: string, serpamicsId: string) => {
    handleWritingSave(content, serpamicsId, analysisState.uniqueId, analysisState.projectName);
  };

  const handleExport = async () => {
    try {
      setShowExportNotification(true);
      const content = resumeContent || writingState.content;
      if (!content) return;
      
      await exportContent({
        content,
        projectName: resumeProjectName || analysisState.projectName
      });
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleResumeProject = async (projectName: string) => {
    setShowResumeModal(false);
    setResumeProjectName(projectName);
    setIsResumeLoading(true);

    try {
      const content = await generateResumeWriting({
        persona: '',
        tone: '',
        projectName
      });
      setResumeContent(content);
    } catch (error) {
      console.error('Resume project failed:', error);
    } finally {
      setIsResumeLoading(false);
    }
  };

  const handleResumeWritingSubmit = async (data: { persona: string; tone: string }) => {
    if (!resumeProjectName) return;
    
    setIsResumeLoading(true);
    try {
      const content = await generateResumeWriting({
        ...data,
        projectName: resumeProjectName
      });
      setResumeContent(content);
    } catch (error) {
      console.error('Resume writing failed:', error);
    } finally {
      setIsResumeLoading(false);
    }
  };

  const handleResumeEdit = () => {
    setIsResumeEditing(true);
  };

  const handleResumeSave = async (content: string) => {
    if (!resumeProjectName) return;
    
    try {
      await handleWritingSave(content, '', undefined, resumeProjectName);
      setResumeContent(content);
      setIsResumeEditing(false);
    } catch (error) {
      console.error('Save resume failed:', error);
    }
  };

  if (!authState.isAuthenticated) {
    return (
      <LoginModal
        onSubmit={handleLogin}
        isLoading={authState.isLoading}
        error={authState.error}
      />
    );
  }

  const shouldShowExportButton = Boolean(writingState.content || resumeContent);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <LoadingModal 
          isOpen={analysisState.isLoading || writingState.isLoading || isResumeLoading} 
          isWritingGeneration={writingState.isLoading || isResumeLoading}
        />
        
        <ExportNotification 
          show={showExportNotification}
          onClose={() => setShowExportNotification(false)}
        />
        
        <ResumeProjectModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
          onSubmit={handleResumeProject}
        />
        
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowResumeModal(true)}
              className="h-14 px-6 flex justify-center items-center border border-indigo-600 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Reprendre un projet
            </button>
            {shouldShowExportButton && (
              <button
                onClick={handleExport}
                className="h-14 px-6 flex justify-center items-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                Export
              </button>
            )}
            <button
              onClick={handleLogout}
              className="h-14 px-6 flex justify-center items-center border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {!resumeProjectName ? (
          <>
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-pink-100 p-2 rounded">
                <FileText className="w-5 h-5 text-pink-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Brief de rédaction</h1>
            </div>

            <AnalysisForm 
              onSubmit={handleSubmit}
              isLoading={analysisState.isLoading}
            />

            {analysisState.error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{analysisState.error}</p>
              </div>
            )}

            {analysisState.result && !analysisState.isLoading && (
              <AnalysisResult
                content={analysisState.result}
                analysis={analysisState.analysis}
                isEditing={analysisState.isEditing}
                keyword={analysisState.keyword}
                language={analysisState.language}
                serpamicsId={analysisState.serpamicsId}
                projectName={analysisState.projectName}
                onEdit={handleEdit}
                onSave={handleSave}
              />
            )}

            {analysisState.result && !analysisState.isLoading && (
              <WritingSection
                analysis={analysisState.analysis}
                brief={analysisState.result}
                serpamicsId={analysisState.serpamicsId}
                onSubmit={handleWritingFormSubmit}
                isLoading={writingState.isLoading}
                content={writingState.content}
                isEditing={writingState.isEditing}
                onEdit={handleWritingEdit}
                onSave={handleWritingSaveWrapper}
                projectName={analysisState.projectName}
              />
            )}

            {writingState.error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{writingState.error}</p>
              </div>
            )}
          </>
        ) : (
          <ResumeWritingSection
            projectName={resumeProjectName}
            onSubmit={handleResumeWritingSubmit}
            isLoading={isResumeLoading}
            content={resumeContent}
            isEditing={isResumeEditing}
            onEdit={handleResumeEdit}
            onSave={handleResumeSave}
          />
        )}
      </div>
    </div>
  );
}

export default App;