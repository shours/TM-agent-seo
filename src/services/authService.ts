import axios from 'axios';
import { LoginFormData } from '../types/auth';

const LOGIN_WEBHOOK_URL = 'https://hook.eu2.make.com/pkmg41gn6a3ku7p5q66iutwvhr0i8uty';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const login = async (data: LoginFormData): Promise<boolean> => {
  try {
    const response = await api.post(LOGIN_WEBHOOK_URL, data);
    
    if (!response.data) {
      throw new Error('Invalid response');
    }

    return response.data === 'reussie';
  } catch (error) {
    return false;
  }
};