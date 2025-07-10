// // src/pages/organizer/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import eventService from '../../services/eventService';
// import notificationService from '../../services/notificationService';
// import { useAuthContext } from '../../context/AuthContext';
// import OrganizerLayout from '../../compnents/layout/OrganizerLayout'

// const Dashboard = () => {
//   const { user } = useAuthContext();
//   const [events, setEvents] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   const fetchMyEvents = async () => {
//     try {
//       const data = await eventService.getMyEvents();
//       setEvents(data);
//     } catch (err) {
//       toast.error('Failed to load events');
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const data = await notificationService.getNotifications();
//       setNotifications(data);
//     } catch (err) {
//       console.error('Failed to fetch notifications');
//     }
//   };

//   useEffect(() => {
//     fetchMyEvents();
//     fetchNotifications();
//   }, []);

//   const chartData = events.map((event) => ({
//     name: event.name.slice(0, 10), // truncate long names
//     registrations: event.participantCount || 0,
//   }));

//   return (
//     <div className="p-6">
//     <OrganizerLayout/>
//       <Toaster position="top-right" />
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

//       {/* Quick Links */}
//       <div className="flex gap-4 mb-6">
//         <Link to="/organizer/create-event" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
//           ➕ Create Event
//         </Link>
//         <Link to="/organizer/my-events" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//           📁 My Events
//         </Link>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
//         <div className="bg-blue-100 p-4 rounded shadow text-center">
//           <p className="text-lg font-semibold text-blue-700">Total Events</p>
//           <p className="text-2xl font-bold">{events.length}</p>
//         </div>
//         <div className="bg-yellow-100 p-4 rounded shadow text-center">
//           <p className="text-lg font-semibold text-yellow-700">Total Registrations</p>
//           <p className="text-2xl font-bold">
//             {events.reduce((sum, ev) => sum + (ev.participantCount || 0), 0)}
//           </p>
//         </div>
//         <div className="bg-purple-100 p-4 rounded shadow text-center">
//           <p className="text-lg font-semibold text-purple-700">Your Role</p>
//           <p className="text-2xl font-bold capitalize">{user?.role}</p>
//         </div>
//         <div className="bg-green-100 p-4 rounded shadow text-center">
//           <p className="text-lg font-semibold text-green-700">Upcoming</p>
//           <p className="text-2xl font-bold">
//             {events.filter((ev) => new Date(ev.date) > new Date()).length}
//           </p>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="bg-white rounded shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-2">📊 Registrations per Event</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Bar dataKey="registrations" fill="#4f46e5" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Notifications */}
//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-lg font-semibold mb-2">🔔 Notifications</h2>
//         {notifications.length === 0 ? (
//           <p className="text-sm text-gray-500">No recent notifications.</p>
//         ) : (
//           <ul className="space-y-2 text-sm">
//             {notifications.slice(0, 5).map((note) => (
//               <li key={note._id} className="border-b pb-2">
//                 {note.message} <span className="text-xs text-gray-400">({new Date(note.createdAt).toLocaleDateString()})</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// src/pages/organizer/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import eventService from '../../services/eventService';
import * as eventService from '../../services/eventService'; 
import notificationService from '../../services/notificationService';
import { useAuthContext } from '../../context/AuthContext';
import OrganizerLayout from '../../compnents/layout/OrganizerLayout';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const fetchMyEvents = async () => {
    try {
      const data = await eventService.getMyEvents();

      // Ensure events is always an array
      const eventList = Array.isArray(data) ? data : data?.data || [];
      setEvents(eventList);
    } catch (err) {
      console.error('Failed to load events', err);
      toast.error('Failed to load events');
      setEvents([]); // fallback to empty array
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();

      const notificationList = Array.isArray(data) ? data : data?.data || [];
      setNotifications(notificationList);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchMyEvents();
    fetchNotifications();
  }, []);

  const chartData = Array.isArray(events)
    ? events.map((event) => ({
        name: event.name?.slice(0, 10) || 'Unnamed',
        registrations: event.participantCount || 0,
      }))
    : [];

  return (
    <div className="p-6">
     
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

      {/* Quick Links */}
      <div className="flex gap-4 mb-6">
        <Link to="/organizer/create-event" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          ➕ Create Event
        </Link>
        <Link to="/organizer/my-events" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          📁 My Events
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold text-blue-700">Total Events</p>
          <p className="text-2xl font-bold">{events.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold text-yellow-700">Total Registrations</p>
          <p className="text-2xl font-bold">
            {events.reduce((sum, ev) => sum + (ev.participantCount || 0), 0)}
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold text-purple-700">Your Role</p>
          <p className="text-2xl font-bold capitalize">{user?.role}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold text-green-700">Upcoming</p>
          <p className="text-2xl font-bold">
            {events.filter((ev) => new Date(ev.date) > new Date()).length}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">📊 Registrations per Event</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="registrations" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">🔔 Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No recent notifications.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {notifications.slice(0, 5).map((note) => (
              <li key={note._id} className="border-b pb-2">
                {note.message}{' '}
                <span className="text-xs text-gray-400">
                  ({new Date(note.createdAt).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
