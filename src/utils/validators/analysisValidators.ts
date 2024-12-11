import { SaveAnalysisData } from '../../types/analysis';

export const validateSaveData = (data: SaveAnalysisData): void => {
  if (!data.serpamicsId) {
    throw new Error('SerpamicsId is required for saving');
  }
  if (!data.content) {
    throw new Error('Content is required for saving');
  }
  if (!data.keyword) {
    throw new Error('Keyword is required for saving');
  }
};