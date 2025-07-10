// ✅ src/pages/user/EventDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import eventService from '../../services/eventService';
// import registrationService from '../../services/registrationService';
// import useAuth  from '../../hooks/useAuth';
// import { toast } from 'react-hot-toast';

// const EventDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data = await eventService.getEventById(id);
//         setEvent(data);
//       } catch (err) {
//         console.error('Error loading event', err);
//       }
//     };
//     fetch();
//   }, [id]);

//   const handleRegister = async () => {
//     try {
//       await registrationService.registerUserForEvent(user._id, id);
//       toast.success('Registered successfully!');
//     } catch (err) {
//       toast.error('Already registered or failed.');
//     }
//   };

//   if (!event) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
//       <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
//       <p className="text-gray-500 mb-2">
//         {new Date(event.date).toLocaleDateString()} at {event.location}
//       </p>
//       <img
//         src={event.image || '/default-poster.jpg'}
//         alt="Poster"
//         className="w-full h-64 object-cover rounded mb-4"
//       />
//       <p className="mb-4">{event.description}</p>
//       <button
//         onClick={handleRegister}
//         className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//       >
//         Register
//       </button>
//     </div>
//   );
// };

// export default EventDetails;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/eventService'; // ✅ FIXED
import registrationService from '../../services/registrationService';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getEventById(id); // ✅ direct function call
        setEvent(data);
      } catch (err) {
        console.error('Error loading event', err);
      }
    };
    fetch();
  }, [id]);

  const handleRegister = async () => {
    try {
      await registrationService.registerUserForEvent(user._id, id);
      toast.success('Registered successfully!');
    } catch (err) {
      toast.error('Already registered or failed.');
    }
  };

  if (!event) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-500 mb-2">
        {new Date(event.date).toLocaleDateString()} at {event.location}
      </p>
      <img
        src={event.image || '/default-poster.jpg'}
        alt="Poster"
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-4">{event.description}</p>
      <button
        onClick={handleRegister}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Register
      </button>
    </div>
  );
};

export default EventDetails;
