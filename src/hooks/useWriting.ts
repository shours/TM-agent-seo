import { useState, useCallback } from 'react';
import { generateWriting } from '../services/writingService';
import { saveWriting } from '../services/writingSaveService';

interface WritingState {
  content: string | null;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

const initialState: WritingState = {
  content: null,
  isLoading: false,
  error: null,
  isEditing: false,
};

export const useWriting = () => {
  const [state, setState] = useState<WritingState>(initialState);

  const handleSubmit = useCallback(async (
    analysis: string,
    brief: string,
    serpamicsId: string,
    persona: string,
    tone: string,
    uniqueId?: string,
    projectName?: string
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const content = await generateWriting({
        analysis,
        brief,
        serpamicsId,
        persona,
        tone,
        uniqueId,
        projectName
      });

      setState(prev => ({
        ...prev,
        content,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate writing'
      }));
    }
  }, []);

  const handleEdit = useCallback(() => {
    setState(prev => ({ ...prev, isEditing: true }));
  }, []);

  const handleSave = useCallback(async (content: string, serpamicsId: string, uniqueId?: string, projectName?: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await saveWriting({
        content,
        serpamicsId,
        uniqueId,
        projectName
      });

      setState(prev => ({
        ...prev,
        content,
        isEditing: false,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to save writing'
      }));
    }
  }, []);

  return {
    state,
    handleSubmit,
    handleEdit,
    handleSave,
  };
};