const config = {
  apiUrl: 'https://anotherhowtoguru.pythonanywhere.com/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout'
    },
    curriculum: {
      topics: '/curriculum/topics',
      lessons: '/curriculum/lessons',
      exercises: '/curriculum/exercises'
    },
    progress: {
      user: '/progress/user',
      topic: '/progress/topic',
      lesson: '/progress/lesson'
    },
    achievements: {
      list: '/achievements',
      user: '/achievements/user'
    }
  }
};

export default config;
