import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";

export default function BlHeader() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Mock user & notifications (replace with API data later)
  const user = { firstname: "John", lastname: "Doe", email: "john@example.com" };
  const notifications = [
    { id: 1, course_code: "CS101", school_year: "2025", message: "New syllabus uploaded", for: "JD" },
    { id: 2, course_code: "IT205", school_year: "2025", message: "Deadline approaching", for: "JD" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow px-6 py-3 flex items-center justify-between z-50">
      {/* Logo */}
      <img src="/assets/Sample/syllabease.png" alt="SyllabEase" className="h-8" />

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <Bell className="w-6 h-6 text-blue-700" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded p-4 max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-2">Notifications</h3>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center rounded-full mr-3">
                    {n.for}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {n.course_code} - {n.school_year}
                    </p>
                    <p className="text-sm text-gray-600">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold"
          >
            {user.firstname[0]}
            {user.lastname[0]}
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded p-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                  {user.firstname[0]}
                  {user.lastname[0]}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <a href="/profile" className="text-blue-600 underline">
                    My Profile
                  </a>
                </div>
              </div>
              <button className="mt-4 flex items-center gap-2 text-red-600 hover:underline">
                <LogOut size={18} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
