// src/components/cards/EventCard.jsx
import React from 'react';

const EventCard = ({ event, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-blue-600">{event.title}</h2>
      <p className="text-gray-600 mt-1">{event.description}</p>
      <div className="text-sm text-gray-500 mt-2">
        <span className="block">Date: {new Date(event.date).toLocaleDateString()}</span>
        <span className="block">Venue: {event.venue}</span>
      </div>
    </div>
  );
};

export default EventCard;