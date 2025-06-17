import config from '../config.js';

class ApiService {
  constructor() {
    this.baseUrl = config.apiUrl;
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
    };

    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, finalOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }

  // Auth Endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(username, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  // User Endpoints
  async getUserProfile() {
    return this.request('/user/profile');
  }

  async updateChildProfile(childId, data) {
    return this.request(`/user/children/${childId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Curriculum Endpoints
  async getTopics() {
    return this.request('/curriculum/topics');
  }

  async getTopic(topicId) {
    return this.request(`/curriculum/topics/${topicId}`);
  }

  async getLessons(topicId) {
    return this.request(`/curriculum/topics/${topicId}/lessons`);
  }

  async getLesson(lessonId) {
    return this.request(`/curriculum/lessons/${lessonId}`);
  }

  async getExercises(lessonId) {
    return this.request(`/curriculum/lessons/${lessonId}/exercises`);
  }

  async getExercise(exerciseId) {
    return this.request(`/curriculum/exercises/${exerciseId}`);
  }

  // Progress Endpoints
  async getProgress() {
    return this.request('/progress');
  }

  async updateLessonProgress(lessonId, completed) {
    return this.request(`/progress/lessons/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
    });
  }

  async updateExerciseProgress(exerciseId, completed) {
    return this.request(`/progress/exercises/${exerciseId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
    });
  }
}

export default new ApiService();
