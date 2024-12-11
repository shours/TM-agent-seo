import axios from 'axios';

const WRITING_WEBHOOK_URL = 'https://hook.eu2.make.com/qq2imnxb1qy0a3rngq2qepf5yfxtwa8v';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 180000, // 180 seconds timeout
});

interface WritingData {
  analysis: string;
  brief: string;
  serpamicsId: string;
  persona: string;
  tone: string;
  uniqueId?: string;
  projectName?: string;
}

export const generateWriting = async (data: WritingData): Promise<string> => {
  try {
    const payload = {
      analysis: data.analysis,
      brief: data.brief,
      serpamicsId: data.serpamicsId,
      persona: data.persona,
      tone: data.tone,
      uniqueId: data.uniqueId,
      projectName: data.projectName
    };

    const response = await api.post(WRITING_WEBHOOK_URL, payload);
    
    if (!response.data) {
      throw new Error('No response data received');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('La requête a pris trop de temps. Veuillez réessayer.');
      }
      throw new Error(`Erreur réseau: ${error.message}`);
    }
    throw error instanceof Error 
      ? error 
      : new Error('Échec de la génération du contenu');
  }
};