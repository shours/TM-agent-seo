import axios from 'axios';

const EXPORT_WEBHOOK_URL = 'https://hook.eu2.make.com/syt9mnxrdvchpwcjeakuchart5pi8idc';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 90000, // 90 seconds timeout
});

interface ExportData {
  keyword: string;
  content: string;
  projectName?: string;
}

export const exportContent = async (data: ExportData): Promise<void> => {
  try {
    const response = await api.post(EXPORT_WEBHOOK_URL, data);
    
    if (response.status !== 200) {
      throw new Error('Invalid response from export webhook');
    }
  } catch (error) {
    console.error('Export error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error during export: ${error.message}`);
    }
    throw error instanceof Error 
      ? error 
      : new Error('Failed to export content');
  }
};