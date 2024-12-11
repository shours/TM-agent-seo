import axios from 'axios';
import { AnalysisFormData, AnalysisResponse } from '../types/analysis';

const ANALYSIS_WEBHOOK_URL = 'https://hook.eu2.make.com/4rtleidm178q8irs95osp4bsucb9tr6a';

export const submitAnalysis = async (data: AnalysisFormData): Promise<AnalysisResponse> => {
  try {
    const response = await axios.post(ANALYSIS_WEBHOOK_URL, {
      keyword: data.keyword,
      language: data.language === 'fr' ? 'Français' : 'English',
      searchEngine: data.searchEngine,
      requestId: Date.now().toString()
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 seconds timeout
    });

    if (!response.data) {
      throw new Error('Aucune donnée reçue du webhook');
    }

    // Handle both string and object responses
    const result = typeof response.data === 'string' 
      ? { content: response.data, serpamicsId: null }
      : response.data;

    return {
      content: result.content,
      serpamicsId: result.serpamicsId || null,
      keyword: data.keyword,
      language: data.language
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('La requête a expiré. Veuillez réessayer.');
      }
      if (error.response?.status === 429) {
        throw new Error('Trop de requêtes. Veuillez patienter quelques instants.');
      }
      throw new Error(
        error.response?.data?.message || 
        'Erreur de connexion au webhook. Veuillez vérifier votre connexion et réessayer.'
      );
    }
    throw error;
  }
};