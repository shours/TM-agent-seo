import axios from 'axios';
import { SaveAnalysisData } from '../types/analysis';

const SAVE_WEBHOOK_URL = 'https://hook.eu2.make.com/ldkbi1q53dk7t769udibfa2lvv0lsf9x';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 90000, // 90 seconds timeout
});

export const saveAnalysis = async (data: SaveAnalysisData): Promise<void> => {
  if (!data.serpamicsId || !data.content || !data.keyword) {
    throw new Error('Missing required data for saving');
  }

  try {
    const payload = {
      content: data.content,
      keyword: data.keyword,
      serpamicsId: data.serpamicsId,
      unique_id: data.uniqueId,
      language: data.language || 'en',
      projectName: data.projectName
    };

    const response = await api.post(SAVE_WEBHOOK_URL, payload);
    
    if (response.status !== 200) {
      throw new Error('Invalid response from save webhook');
    }
  } catch (error) {
    console.error('Save error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error during save: ${error.message}`);
    }
    throw error instanceof Error 
      ? error 
      : new Error('Failed to save analysis');
  }
};