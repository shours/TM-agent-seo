import { useState, useCallback } from 'react';
import { AnalysisFormData, AnalysisState, SaveAnalysisData } from '../types/analysis';
import { analyzeKeyword } from '../services/analyseService';
import { saveAnalysis } from '../services/saveService';

const initialState: AnalysisState = {
  isLoading: false,
  error: null,
  result: null,
  analysis: null,
  isEditing: false,
  serpamicsId: null,
  keyword: null,
  language: null,
  uniqueId: null,
  projectName: null
};

export const useAnalysis = () => {
  const [state, setState] = useState<AnalysisState>(initialState);

  const handleSubmit = useCallback(async (data: AnalysisFormData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await analyzeKeyword(data);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: response.content,
        analysis: response.analysis,
        serpamicsId: response.serpamicsId,
        keyword: response.keyword,
        language: response.language,
        uniqueId: data.serpamicsId,
        projectName: data.projectName,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
        result: null,
        analysis: null
      }));
    }
  }, []);

  const handleEdit = useCallback(() => {
    setState(prev => ({ ...prev, isEditing: true }));
  }, []);

  const handleSave = useCallback(async (content: string) => {
    if (!state.serpamicsId || !state.keyword) {
      setState(prev => ({
        ...prev,
        error: 'Missing required data for saving'
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const saveData: SaveAnalysisData = {
        serpamicsId: state.serpamicsId,
        keyword: state.keyword,
        content,
        language: state.language || undefined,
        uniqueId: state.uniqueId,
        projectName: state.projectName
      };

      await saveAnalysis(saveData);

      setState(prev => ({
        ...prev,
        isLoading: false,
        isEditing: false,
        result: content,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Échec de l'enregistrement"
      }));
    }
  }, [state.serpamicsId, state.keyword, state.language, state.uniqueId, state.projectName]);

  return {
    state,
    handleSubmit,
    handleEdit,
    handleSave,
  };
};