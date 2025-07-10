// // src/services/eventService.js
// import axiosInstance from './axiosInstance';

// // 🟢 Fetch all events
// export const getAllEvents = async () => {
//   const res = await axiosInstance.get('/events');
//   return res.data;
// };

// // 🟢 Fetch single event by ID
// export const getEventById = async (id) => {
//   const res = await axiosInstance.get(`/events/${id}`);
//   return res.data;
// };

// // 🟢 Create event (detects if formData is sent)
// export const createEvent = async (eventData) => {
//   const isFormData = eventData instanceof FormData;

//   const config = {
//     headers: {
//       'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
//       Authorization: `Bearer ${getToken()}`, // ✅ attach token
//     },
//   };

//   const res = await axiosInstance.post('/events', eventData, config);
//   return res.data;
// };

// // 🟢 Update event
// export const updateEvent = async (id, eventData) => {
//   const res = await axiosInstance.put(`/events/${id}`, eventData);
//   return res.data;
// };

// // 🟢 Delete event
// export const deleteEvent = async (id) => {
//   const res = await axiosInstance.delete(`/api/events/${id}`);
//   return res.data;
// };


// // src/services/eventService.js
// import axios from 'axios';

// const API_URL = '/api/events';

// const getMyEvents = async () => {
//   const response = await axios.get(`${API_URL}/my`);
//   return response.data;
// };



// export default {
//   getMyEvents,
//   deleteEvent,
// };


// import axiosInstance from './axiosInstance'; // your pre-configured axios (with base URL & auth)
// import { getToken } from './authService'; // ensure you have this helper

// // 🟢 Fetch all events
// const getAllEvents = async () => {
//   const res = await axiosInstance.get('/events');
//   return res.data;
// };

// // 🟢 Fetch single event by ID
// const getEventById = async (id) => {
//   const res = await axiosInstance.get(`/events/${id}`);
//   return res.data;
// };

// // 🟢 Create event (detects if formData is sent)
// const createEvent = async (eventData) => {
//   const isFormData = eventData instanceof FormData;

//   const config = {
//     headers: {
//       'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
//       Authorization: `Bearer ${getToken()}`, // ✅ attach token
//     },
//   };

//   const res = await axiosInstance.post('/events', eventData, config);
//   return res.data;
// };

// // 🟢 Update event
// const updateEvent = async (id, eventData) => {
//   const res = await axiosInstance.put(`/events/${id}`, eventData);
//   return res.data;
// };

// // 🟢 Delete event
// const deleteEvent = async (id) => {
//   const res = await axiosInstance.delete(`/events/${id}`);
//   return res.data;
// };

// // 🟢 Fetch events for the current organizer
// const getMyEvents = async () => {
//   const res = await axiosInstance.get('/events/my');
//   return res.data;
// };

// export default {
//   getAllEvents,
//   getEventById,
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   getMyEvents,
// };



// import axiosInstance from './axiosInstance'; // Pre-configured axios instance
// import { getToken } from './authService';    // Token helper

// // 🟢 Fetch all events
// export const getAllEvents = async () => {
//   const res = await axiosInstance.get('/events');
//   return res.data;
// };

// // 🟢 Fetch single event by ID
// export const getEventById = async (id) => {
//   const res = await axiosInstance.get(`/events/${id}`);
//   return res.data;
// };

// // 🟢 Create event (handles formData if present)
// export const createEvent = async (eventData) => {
//   const isFormData = eventData instanceof FormData;

//   const config = {
//     headers: {
//       'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
//       Authorization: `Bearer ${getToken()}`, // ✅ Attach token
//     },
//   };

//   const res = await axiosInstance.post('/events', eventData, config);
//   return res.data;
// };

// // 🟢 Update event
// export const updateEvent = async (id, eventData) => {
//   const res = await axiosInstance.put(`/events/${id}`, eventData);
//   return res.data;
// };

// // 🟢 Delete event
// export const deleteEvent = async (id) => {
//   const res = await axiosInstance.delete(`/events/${id}`);
//   return res.data;
// };

// // 🟢 Get current user's events
// export const getMyEvents = async () => {
//   const res = await axiosInstance.get('/events/my');
//   return res.data;
// };



import axiosInstance from './axiosInstance'; // Pre-configured axios instance
import { getToken } from './authService';    // Token helper

// 🟢 Fetch all events
export const getAllEvents = async () => {
  const res = await axiosInstance.get('/events');
  return res.data;
};

// 🟢 Fetch single event by ID
export const getEventById = async (id) => {
  const res = await axiosInstance.get(`/events/${id}`);
  return res.data;
};

// 🟢 Create event (handles formData if present)
export const createEvent = async (eventData) => {
  const isFormData = eventData instanceof FormData;

  const config = {
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const res = await axiosInstance.post('/events', eventData, config);
  return res.data;
};

// 🟢 Update event
export const updateEvent = async (id, eventData) => {
  const res = await axiosInstance.put(`/events/${id}`, eventData);
  return res.data;
};

// 🟢 Delete event
export const deleteEvent = async (id) => {
  const res = await axiosInstance.delete(`/events/${id}`);
  return res.data;
};

// 🟢 Get current user's events
export const getMyEvents = async () => {
  const res = await axiosInstance.get('/events/my');
  return res.data;
};
