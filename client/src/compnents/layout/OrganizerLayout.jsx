// src/components/layout/OrganizerLayout.jsx
import React from 'react';
import OrganizerSidebar from './OrganizerSidebar';
import { Outlet } from 'react-router-dom';

const OrganizerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <OrganizerSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* Renders child routes like Dashboard, MyEvents, etc. */}
      </main>
    </div>
  );
};

export default OrganizerLayout;
