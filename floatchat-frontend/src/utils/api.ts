// API utility functions for FloatChat frontend

const API_BASE_URL = '';  // Empty since we're using Vite proxy

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

interface ChatMessage {
  sessionId: string;
  response: string;
  timestamp: string;
}

interface ChatHistorySession {
  _id: string;
  messages: Array<{
    type: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  updatedAt: string;
  createdAt: string;
}

interface ChatHistoryResponse {
  sessions: ChatHistorySession[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Get authentication token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API calls
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, name: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  logout: async (): Promise<ApiResponse<{}>> => {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  },
};

// Chat API calls  
export const chatApi = {
  sendMessage: async (question: string, sessionId?: string): Promise<ApiResponse<ChatMessage>> => {
    return apiRequest('/api/chat/message', {
      method: 'POST',
      body: JSON.stringify({ question, sessionId }),
    });
  },

  getChatHistory: async (page: number = 1, limit: number = 10): Promise<ApiResponse<ChatHistoryResponse>> => {
    return apiRequest(`/api/chat/history?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  simulateChain: async (query: string): Promise<ApiResponse<any>> => {
    return apiRequest('/api/chat/simulate', {
      method: 'POST', 
      body: JSON.stringify({ query }),
    });
  },
};

// Query API calls
export const queryApi = {
  translateAndExecute: async (question: string): Promise<ApiResponse<any>> => {
    return apiRequest('/api/query/translate', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
  },

  explainQuery: async (question: string): Promise<ApiResponse<any>> => {
    return apiRequest('/api/query/explain', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
  },
};

// User API calls
export const userApi = {
  getProfile: async (): Promise<ApiResponse<any>> => {
    return apiRequest('/api/users/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (profileData: any): Promise<ApiResponse<any>> => {
    return apiRequest('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Image API calls
export const imageApi = {
  getRandomImage: async (query?: string): Promise<ApiResponse<any>> => {
    const endpoint = query ? `/api/images/random?query=${encodeURIComponent(query)}` : '/api/images/random';
    return apiRequest(endpoint, {
      method: 'GET',
    });
  },
};