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

// Get current user ID from localStorage
const getCurrentUserId = (): string | null => {
  return localStorage.getItem('currentUserId');
};

// Set current user ID in localStorage
const setCurrentUserId = (userId: string): void => {
  localStorage.setItem('currentUserId', userId);
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

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
  login: async (email: string, password: string): Promise<ApiResponse<{ user: any }>> => {
    const response = await apiRequest<ApiResponse<{ user: any }>>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store user ID for future requests
    if (response.success && response.data?.user?.id) {
      setCurrentUserId(response.data.user.id);
    }
    
    return response;
  },

  register: async (email: string, password: string, name: string): Promise<ApiResponse<{ user: any }>> => {
    const response = await apiRequest<ApiResponse<{ user: any }>>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    // Store user ID for future requests
    if (response.success && response.data?.user?.id) {
      setCurrentUserId(response.data.user.id);
    }
    
    return response;
  },

  logout: async (): Promise<ApiResponse<{}>> => {
    const response = await apiRequest<ApiResponse<{}>>('/api/auth/logout', {
      method: 'POST',
    });
    
    // Clear stored user ID
    localStorage.removeItem('currentUserId');
    
    return response;
  },
};

// Chat API calls  
export const chatApi = {
  sendMessage: async (question: string, sessionId?: string): Promise<ApiResponse<ChatMessage>> => {
    const userId = getCurrentUserId();
    return apiRequest('/api/chat/message', {
      method: 'POST',
      body: JSON.stringify({ question, sessionId, userId }),
    });
  },

  getChatHistory: async (page: number = 1, limit: number = 10): Promise<ApiResponse<ChatHistoryResponse>> => {
    const userId = getCurrentUserId();
    return apiRequest(`/api/chat/history?page=${page}&limit=${limit}&userId=${userId}`, {
      method: 'GET',
    });
  },

  simulateChain: async (query: string): Promise<ApiResponse<any>> => {
    const userId = getCurrentUserId();
    return apiRequest('/api/chat/simulate', {
      method: 'POST', 
      body: JSON.stringify({ query, userId }),
    });
  },
};

// Query API calls
export const queryApi = {
  translateAndExecute: async (question: string): Promise<ApiResponse<any>> => {
    const userId = getCurrentUserId();
    return apiRequest('/api/query/translate', {
      method: 'POST',
      body: JSON.stringify({ question, userId }),
    });
  },

  explainQuery: async (question: string): Promise<ApiResponse<any>> => {
    const userId = getCurrentUserId();
    return apiRequest('/api/query/explain', {
      method: 'POST',
      body: JSON.stringify({ question, userId }),
    });
  },
};

// User API calls
export const userApi = {
  getProfile: async (): Promise<ApiResponse<any>> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('No user logged in');
    }
    return apiRequest(`/api/users/profile/${userId}`, {
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

// Export utility functions
export { getCurrentUserId, setCurrentUserId };

// Image API calls
export const imageApi = {
  getRandomImage: async (query?: string): Promise<ApiResponse<any>> => {
    const endpoint = query ? `/api/images/random?query=${encodeURIComponent(query)}` : '/api/images/random';
    return apiRequest(endpoint, {
      method: 'GET',
    });
  },
};