import axios from 'axios';

const WRITING_SAVE_WEBHOOK_URL = 'https://hook.eu2.make.com/h595mjr1y8s6knsigeumhni14g2753o1';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 90000, // 90 seconds timeout
});

interface WritingSaveData {
  content: string;
  serpamicsId: string;
  uniqueId?: string;
  projectName?: string;
}

export const saveWriting = async (data: WritingSaveData): Promise<void> => {
  try {
    const payload = {
      content: data.content,
      serpamicsId: data.serpamicsId,
      unique_id: data.uniqueId,
      projectName: data.projectName
    };

    const response = await api.post(WRITING_SAVE_WEBHOOK_URL, payload);
    
    if (!response.data || response.status !== 200) {
      throw new Error('Invalid response from save webhook');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error during save: ${error.message}`);
    }
    throw error instanceof Error 
      ? error 
      : new Error('Failed to save writing');
  }
};