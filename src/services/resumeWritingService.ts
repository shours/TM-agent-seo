import axios from 'axios';

const RESUME_WRITING_WEBHOOK_URL = 'https://hook.eu2.make.com/gl14n3wdbgcwq76ywum3571miteeatju';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 180000, // 180 seconds (3 minutes) timeout
});

interface ResumeWritingData {
  persona: string;
  tone: string;
  projectName: string;
}

export const generateResumeWriting = async (data: ResumeWritingData): Promise<string> => {
  try {
    const response = await api.post(RESUME_WRITING_WEBHOOK_URL, data);
    
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