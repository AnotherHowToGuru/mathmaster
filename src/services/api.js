// src/services/api.js

const API_BASE_URL = 'https://anotherhowtoguru.pythonanywhere.com/api';

// Function to fetch all topics
export const getTopics = async ( ) => {
    try {
        const response = await fetch(`${API_BASE_URL}/curriculum/topics`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
};

// Function to fetch a single topic by ID
export const getTopicById = async (topicId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/curriculum/topics/${topicId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching topic ${topicId}:`, error);
        throw error;
    }
};

// Function to fetch lessons for a specific topic
export const getLessonsForTopic = async (topicId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/curriculum/topics/${topicId}/lessons`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching lessons for topic ${topicId}:`, error);
        throw error;
    }
};

// Function to fetch a single lesson by ID
export const getLessonById = async (lessonId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/curriculum/lessons/${lessonId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching lesson ${lessonId}:`, error);
        throw error;
    }
};

// Function to fetch exercises for a specific lesson
export const getExercisesForLesson = async (lessonId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/curriculum/lessons/${lessonId}/exercises`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching exercises for lesson ${lessonId}:`, error);
        throw error;
    }
};

// Function to fetch a single exercise by ID
export const getExerciseById = async (exerciseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/curriculum/exercises/${exerciseId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching exercise ${exerciseId}:`, error);
        throw error;
    }
};
