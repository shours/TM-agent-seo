import axios from 'axios';
import { AnalysisFormData, AnalysisResponse } from '../types/analysis';
import { parseWebhookResponse } from '../utils/parsers/webhookParser';

const ANALYSIS_WEBHOOK_URL = 'https://hook.eu2.make.com/4rtleidm178q8irs95osp4bsucb42j88';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90 seconds timeout
});

export const analyzeKeyword = async (data: AnalysisFormData): Promise<AnalysisResponse> => {
  try {
    const payload = {
      keyword: data.keyword,
      language: data.language === 'fr' ? 'Français' : 'English',
      searchEngine: data.searchEngine,
      audience: data.audience,
      clientInfo: data.clientInfo,
      serpamicsId: data.serpamicsId,
      projectName: data.projectName,
      requestId: Date.now().toString()
    };

    const response = await api.post(ANALYSIS_WEBHOOK_URL, payload);
    
    if (!response.data) {
      throw new Error('No response data received');
    }

    return parseWebhookResponse(response.data, data);
  } catch (error) {
    console.error('Analysis error details:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw error instanceof Error 
      ? error 
      : new Error('Failed to analyze keyword');
  }
};