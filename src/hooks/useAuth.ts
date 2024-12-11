import { useState, useCallback } from 'react';
import { LoginFormData, AuthState } from '../types/auth';
import { login } from '../services/authService';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(initialState);

  const handleLogin = useCallback(async (data: LoginFormData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const success = await login(data);
      
      if (success) {
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
          error: 'Demandez à Severine de vous créer un compte'
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Demandez à Severine de vous créer un compte'
      }));
    }
  }, []);

  const handleLogout = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    handleLogin,
    handleLogout
  };
};