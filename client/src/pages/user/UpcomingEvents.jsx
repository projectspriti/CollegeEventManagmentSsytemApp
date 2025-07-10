// // src/pages/user/UpcomingEvents.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import eventService from '../../services/eventService';

// const UpcomingEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filteredEvents, setFilteredEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await eventService.getAllEvents();
//         setEvents(data);
//         setFilteredEvents(data);
//       } catch (err) {
//         console.error('Failed to fetch events', err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     const results = events.filter((event) =>
//       event.title.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredEvents(results);
//   }, [search, events]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>

//       <input
//         type="text"
//         placeholder="Search events..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="mb-6 p-2 border border-gray-300 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map((event) => (
//             <Link
//               to={`/user/home/event-details/${event._id}`}
//               key={event._id}
//               className="p-4 border rounded-lg shadow hover:shadow-md bg-white transition duration-200"
//             >
//               <h2 className="text-xl font-semibold text-indigo-700">{event.title}</h2>
//               <p className="text-gray-500 text-sm">
//                 {new Date(event.date).toLocaleDateString()} at {event.location}
//               </p>
//               <p className="mt-2 text-gray-700 line-clamp-3">{event.description}</p>
//               <div className="mt-4 text-right text-indigo-600 hover:underline text-sm">
//                 View Details →
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p className="text-gray-500">No events found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpcomingEvents;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import eventService from '../../services/eventService';

// const UpcomingEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);

//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');

//   const uniqueCategories = [...new Set(events.map((e) => e.category))];

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await eventService.getAllEvents();
//         setEvents(data);
//         setFilteredEvents(data);
//       } catch (err) {
//         console.error('Failed to fetch events', err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     let filtered = events;

//     // Search by title
//     if (search) {
//       filtered = filtered.filter((event) =>
//         event.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Filter by category
//     if (selectedCategory) {
//       filtered = filtered.filter((event) => event.category === selectedCategory);
//     }

//     // Filter by date
//     if (selectedDate) {
//       filtered = filtered.filter(
//         (event) => new Date(event.date).toDateString() === new Date(selectedDate).toDateString()
//       );
//     }

//     setFilteredEvents(filtered);
//   }, [search, selectedCategory, selectedDate, events]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search events..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border border-gray-300 rounded w-full md:w-1/3"
//         />

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="p-2 border border-gray-300 rounded w-full md:w-1/4"
//         >
//           <option value="">All Categories</option>
//           {uniqueCategories.map((cat, index) => (
//             <option key={index} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="p-2 border border-gray-300 rounded w-full md:w-1/4"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map((event) => (
//             <Link
//               to={`/user/home/event-details/${event._id}`}
//               key={event._id}
//               className="p-4 border rounded-lg shadow hover:shadow-md bg-white transition duration-200"
//             >
//               <h2 className="text-xl font-semibold text-indigo-700">{event.title}</h2>
//               <p className="text-gray-500 text-sm">
//                 {new Date(event.date).toLocaleDateString()} &middot; {event.location}
//               </p>
//               <p className="text-sm text-gray-600 mt-1">Category: {event.category}</p>
//               <p className="mt-2 text-gray-700 line-clamp-3">{event.description}</p>
//               <div className="mt-4 text-right text-indigo-600 hover:underline text-sm">
//                 View Details →
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p className="text-gray-500">No events found with current filters.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpcomingEvents;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../services/eventService'; // ✅ updated

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const uniqueCategories = [...new Set(events.map((e) => e.category))];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents(); // ✅ updated
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        console.error('Failed to fetch events', err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (search) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (event) =>
          new Date(event.date).toDateString() === new Date(selectedDate).toDateString()
      );
    }

    setFilteredEvents(filtered);
  }, [search, selectedCategory, selectedDate, events]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link
              to={`/user/home/event-details/${event._id}`}
              key={event._id}
              className="p-4 border rounded-lg shadow hover:shadow-md bg-white transition duration-200"
            >
              <h2 className="text-xl font-semibold text-indigo-700">{event.title}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(event.date).toLocaleDateString()} &middot; {event.location}
              </p>
              <p className="text-sm text-gray-600 mt-1">Category: {event.category}</p>
              <p className="mt-2 text-gray-700 line-clamp-3">{event.description}</p>
              <div className="mt-4 text-right text-indigo-600 hover:underline text-sm">
                View Details →
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No events found with current filters.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
