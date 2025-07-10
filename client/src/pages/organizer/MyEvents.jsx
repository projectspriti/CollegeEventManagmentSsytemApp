// src/pages/organizer/MyEvents.jsx
import React, { useEffect, useState } from 'react';
import eventService from '../../services/eventService';
import EventCard from '../../components/cards/EventCard';
import EventDetailsModal from '../../components/modals/EventDetailsModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import EditEventModal from '../../components/modals/EditEventModal';
import { Toaster, toast } from 'react-hot-toast';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchMyEvents = async () => {
    try {
      const data = await eventService.getMyEvents();
      setEvents(data);
      toast.success('Events loaded', {
        duration: 2000,
        style: {
          background: '#d1fae5',
          color: '#065f46',
        },
      });
    } catch (error) {
      toast.error('Failed to fetch events', {
        duration: 3000,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
        },
      });
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleDelete = async () => {
    try {
      await eventService.deleteEvent(selectedEvent._id);
      setShowConfirmModal(false);
      toast.success('Event deleted successfully', {
        duration: 2500,
        style: {
          background: '#fef3c7',
          color: '#92400e',
        },
      });
      fetchMyEvents();
    } catch (error) {
      toast.error('Error deleting event', {
        duration: 3000,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
        },
      });
      console.error('Error deleting event:', error);
    }
  };

  const handleSaveEdit = async (updatedEvent) => {
    if (!updatedEvent.title || !updatedEvent.date || !updatedEvent.location) {
      toast.error('Please fill in all required fields', {
        duration: 2500,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
        },
      });
      return;
    }

    try {
      await eventService.updateEvent(updatedEvent._id, updatedEvent);
      setShowEditModal(false);
      setShowDetailsModal(false);
      toast.success('Event updated successfully', {
        duration: 2500,
        style: {
          background: '#ecfccb',
          color: '#365314',
        },
      });
      fetchMyEvents();
    } catch (error) {
      toast.error('Error updating event', {
        duration: 3000,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
        },
      });
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onClick={() => {
              setSelectedEvent(event);
              setShowDetailsModal(true);
            }}
          />
        ))}
      </div>

      <EventDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        event={selectedEvent}
        onEdit={(e) => {
          setSelectedEvent(e);
          setShowDetailsModal(false);
          setShowEditModal(true);
        }}
      />

      <EditEventModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        event={selectedEvent}
        onSave={handleSaveEdit}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
};

export default MyEvents;
