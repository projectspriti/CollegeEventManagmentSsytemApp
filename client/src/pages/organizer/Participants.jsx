import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';

const Participants = () => {
  const { token, user } = useAuthContext();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(`/api/participants/organizer/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParticipants(res.data);
      } catch (err) {
        console.error('Error loading participants');
      }
    };
    fetchParticipants();
  }, [user, token]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Participants in My Events</h2>
      {participants.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Event</th>
              <th className="p-2 border">Participant Name</th>
              <th className="p-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {participants.map(p => (
              <tr key={p._id}>
                <td className="border px-2 py-1">{p.event?.title}</td>
                <td className="border px-2 py-1">{p.user?.name}</td>
                <td className="border px-2 py-1">{p.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Participants;
