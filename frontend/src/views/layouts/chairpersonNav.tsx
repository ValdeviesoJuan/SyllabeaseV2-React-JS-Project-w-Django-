import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Navbar } from "flowbite-react";

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Notification {
  id: string;
  data: {
    for: string;
    course_code: string;
    bg_school_year: string;
    message: string;
    action_url: string;
  };
  created_at: Date;
}

interface NavProps {
  user: User;
  notifications: Notification[];
  activeRoute: string;
  handleRouteChange: (route: string) => void;
  handleLogout: () => void;
}

const ChairpersonNav: React.FC<NavProps> = ({
  user,
  notifications,
  activeRoute,
  handleRouteChange,
  handleLogout,
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const getUserInitials = (firstname: string, lastname: string) =>
    `${firstname.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;

  const formatNotificationDate = (date: Date): string =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const navLinks = [
    { label: "Home", route: "chairperson.home" },
    { label: "Outcomes", route: "chairperson.outcomes" },
    { label: "Educational Objectives", route: "chairperson.educationalObjectives" },
    { label: "Curricula", route: "chairperson.curricula" },
    { label: "Courses", route: "chairperson.courses" },
    { label: "Bayanihan Teams", route: "chairperson.bayanihanTeams" },
    { label: "Syllabus", route: "chairperson.syllabus" },
    { label: "TOS", route: "chairperson.tos" },
    { label: "Reports", route: "chairperson.reports" },
  ];

  return (
    <nav className="fixed top-0 z-40 w-full bg-white text-gray-800 shadow-md flex items-center justify-between px-4 py-2">
      {/* Logo */}
      <img
        src="/assets/Sample/syllabease.png"
        alt="SyllabEase"
        className="h-8"
      />

      {/* Center Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <button
            key={link.route}
            onClick={() => handleRouteChange(link.route)}
            className={`px-4 py-2 rounded transition-colors ${
              activeRoute === link.route
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-700 hover:text-blue-700"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div> 

      {/* Right side: Notifications + Profile */}
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
            <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded p-4 max-h-96 overflow-y-auto z-50">
              <h3 className="font-semibold mb-2">Notifications</h3>
              {notifications.length === 0 && (
                <p className="text-gray-500 text-sm">No notifications</p>
              )}
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleRouteChange(n.data.action_url)}
                  className="flex items-start p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center rounded-full mr-3">
                    {n.data.for}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {n.data.course_code} - {n.data.bg_school_year}
                    </p>
                    <p className="text-sm text-gray-600">{n.data.message}</p>
                    <p className="text-xs text-gray-400">
                      {formatNotificationDate(n.created_at)}
                    </p>
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
            className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold"
          >
            {getUserInitials(user.firstname, user.lastname)}
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded p-4 z-50">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                  {getUserInitials(user.firstname, user.lastname)}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <button
                    onClick={() => handleRouteChange("profile.edit")}
                    className="text-blue-600 underline"
                  >
                    My Profile
                  </button>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 flex items-center gap-2 text-red-600 hover:underline"
              >
                <LogOut size={18} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ChairpersonNav;
