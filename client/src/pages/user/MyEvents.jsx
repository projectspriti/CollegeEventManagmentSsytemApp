// ✅ src/pages/user/MyEvents.jsx
import React, { useEffect, useState } from 'react';
import registrationService from '../../services/registrationService';
import useAuth  from '../../hooks/useAuth';

const MyEvents = () => {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await registrationService.getUserRegistrations(user._id);
        setMyEvents(data);
      } catch (err) {
        console.error('Error loading my events', err);
      }
    };
    if (user?._id) fetch();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Registered Events</h1>
      <ul className="space-y-4">
        {myEvents.map((reg) => (
          <li
            key={reg._id}
            className="p-4 bg-white shadow rounded border border-gray-200"
          >
            <h2 className="text-xl font-semibold">{reg.event?.title}</h2>
            <p className="text-sm text-gray-600">
              {new Date(reg.event?.date).toLocaleDateString()} | {reg.event?.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
