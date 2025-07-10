// src/services/registrationService.js
import axiosInstance from './axiosInstance';

// Register a user for an event
export const registerUserForEvent = async (userId, eventId) => {
  const response = await axiosInstance.post(`/registrations`, {
    userId,
    eventId,
  });
  return response.data;
};

// Get all registrations for a specific event
export const getRegistrationsForEvent = async (eventId) => {
  const response = await axiosInstance.get(`/registrations/event/${eventId}`);
  return response.data;
};

// Get all events a user has registered for
export const getUserRegistrations = async (userId) => {
  const response = await axiosInstance.get(`/registrations/user/${userId}`);
  return response.data;
};

export default {
  registerUserForEvent,
  getRegistrationsForEvent,
  getUserRegistrations,
};
