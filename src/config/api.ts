export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  TIMEOUT: 10000,
  
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  }
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.warn('API não está disponível:', error);
    return false;
  }
};
