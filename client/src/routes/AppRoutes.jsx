// import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
// import NotFound from '../pages/shared/NotFound';
// import ErrorPage from '../pages/shared/ErrorPage';

// import ProtectedRoute from './ProtectedRoute';

// // Layouts
// import AdminLayout from '../compnents/layout/AdminLayout'; // ✅ Fixed path

// // Admin Pages
// import AdminDashboard from '../pages/admin/Dashboard';
// import Users from '../pages/admin/Users';
// import Events from '../pages/admin/Events';

// // Organizer Pages
// import OrganizerDashboard from '../pages/organizer/Dashboard';
// import CreateEvent from '../pages/organizer/CreateEvent';

// // User Pages
// import UserHome from '../pages/user/Home';
// import MyEvents from '../pages/user/MyEvents';

// // Shared Pages
// import EventDetails from '../pages/user/EventDetails';
// import Unauthorized from '../pages/shared/Unauthorized';
// // ...


// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<UserHome />} /> {/* or replace with real Home component */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/event/:id" element={<EventDetails />} />

//       {/* Protected User Routes */}
//       <Route element={<ProtectedRoute allowedRoles={['user']} />}>
//         <Route path="/user/home" element={<UserHome />} />
//         <Route path="/user/myevents" element={<MyEvents />} />
//       </Route>

//       {/* Protected Organizer Routes */}
//       <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
//         <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
//         <Route path="/organizer/create" element={<CreateEvent />} />
//       </Route>

//       {/* Protected Admin Routes with Layout */}
//       <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//         <Route
//           path="/admin/dashboard"
//           element={
//             <AdminLayout>
//               <AdminDashboard />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path="/admin/users"
//           element={
//             <AdminLayout>
//               <Users />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path="/admin/events"
//           element={
//             <AdminLayout>
//               <Events />
//             </AdminLayout>
//           }
//         />
//       </Route>

//       {/* Error Handling Routes */}
//       <Route path="/error" element={<ErrorPage />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/unauthorized" element={<Unauthorized />} />
//     </Routes>
//   );
// };

// export default AppRoutes;



import { Routes, Route } from 'react-router-dom';

// Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Shared
import NotFound from '../pages/shared/NotFound';
import ErrorPage from '../pages/shared/ErrorPage';
import Unauthorized from '../pages/shared/Unauthorized';


// Landing Pages (Public)
import Hero from '../pages/landing/Hero';
import About from '../pages/landing/About';
import Contact from '../pages/landing/Contact';
import StoredEvents from '../pages/landing/StoredEvents';

// Protected Routing
import ProtectedRoute from './ProtectedRoute';

// Layouts
import AdminLayout from '../compnents/layout/AdminLayout';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Events from '../pages/admin/Events';

// Organizer Pages
import OrganizerDashboard from '../pages/organizer/Dashboard';
import CreateEvent from '../pages/organizer/CreateEvent';

// User Pages



import Home from '../pages/user/Home';
import UpcomingEvents from '../pages/user/UpcomingEvents';
import MyEvents from '../pages/user/MyEvents';
import EventDetails from '../pages/user/EventDetails';
import OrganizerLayout from '../compnents/layout/OrganizerLayout';
import Dashboard from '../pages/organizer/Dashboard';
import Participants from '../pages/organizer/Participants'


const AppRoutes = () => {
  return (
    <Routes>
      {/* ========= Public Landing Routes ========= */}
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/stored-events" element={<StoredEvents />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========= Event Details (Shared) ========= */}
      <Route path="/event/:id" element={<EventDetails />} />

      {/* ========= Protected User Routes ========= */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        {/* <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/myevents" element={<MyEvents />} /> */}
        {/* User dashboard layout with sidebar */}
        <Route path="/user/home" element={<Home />}>
          <Route index element={<UpcomingEvents />} /> {/* default */}
          <Route path="my-events" element={<MyEvents />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="/user/home/event-details/:id" element={<EventDetails />} />
        </Route>
      </Route>

      {/* ========= Protected Organizer Routes ========= */}
      {/* <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/create" element={<CreateEvent />} />
      </Route> */}

       {/* Organizer Routes Protected by Role and Wrapped in Layout */}
      <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
        <Route path="organizer" element={<OrganizerLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="participants" element={<Participants />} />
          {/* <Route path="notifications" element={<Notifications />} /> */}
        </Route>
      </Route>

      {/* ========= Protected Admin Routes ========= */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminLayout>
              <Events />
            </AdminLayout>
          }
        />
      </Route>

      {/* ========= Error / Fallback Routes ========= */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

