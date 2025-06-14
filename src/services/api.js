import config from '../config.js';

class ApiService {
  constructor( ) {
    this.baseUrl = config.apiUrl;
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      }
    };

    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, finalOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials) {
    const response = await this.request(config.endpoints.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  }

  async register(userData) {
    return await this.request(config.endpoints.auth.register, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  // Curriculum methods
  async getTopics() {
    return await this.request(config.endpoints.curriculum.topics);
  }

  async getLessons(topicId) {
    return await this.request(`${config.endpoints.curriculum.lessons}?topic_id=${topicId}`);
  }

  async getTopic(topicId) {
  return await this.request(`${config.endpoints.curriculum.topics}/${topicId}`);
}

  // Progress methods
  async getUserProgress(userId) {
    return await this.request(`${config.endpoints.progress.user}/${userId}`);
  }

  // Achievements methods
  async getUserAchievements(userId) {
    return await this.request(`${config.endpoints.achievements.user}/${userId}`);
  }

  // Health check
  async healthCheck() {
    return await this.request('/health');
  }
}

export default new ApiService();
