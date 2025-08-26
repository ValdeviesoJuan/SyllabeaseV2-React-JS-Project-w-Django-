import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Props expected from the parent or a top-level data loader
interface Notification {
  id: string | number;
  for?: string;
  action_url?: string;
  course_code?: string;
  bg_school_year?: string;
  message?: string;
  created_at?: string; // ISO date string
}

interface User {
  firstname: string;
  lastname: string;
  email?: string;
}

interface Props {
  user?: User | null;
  notifications?: Notification[];
  activeRoute?: string; // optional helper to mark active nav link
}

// Utility: get initials from user
const getInitials = (user?: User | null) => {
  if (!user) return "";
  const a = user.firstname?.trim()?.charAt(0) ?? "";
  const b = user.lastname?.trim()?.charAt(0) ?? "";
  return (a + b).toUpperCase();
};

const ChairpersonNav: React.FC<Props> = ({ user = null, notifications = [], activeRoute = "" }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const userRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 z-50 w-screen">
        <nav className="flex items-center px-6 py-2 bg-blue-600 text-white shadow-md">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <img src="/assets/Sample/syllabease4.png" alt="SyllabEase" className="w-48" />
          </div>

          {/* Primary nav links */}
          <ul className="ml-auto hidden md:flex md:items-center md:space-x-2">
            <li>
              <Link
                to="/chairperson/home"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.home" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/program-outcome"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.programOutcome" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Outcomes
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/poe"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.poe" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Educational Objectives
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/curricula"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.curr" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Curricula
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/courses"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.course" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/bayanihan"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.bayanihan" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Bayanihan Teams
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/syllabus"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.syllabus" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Syllabus
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/tos"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.tos" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                TOS
              </Link>
            </li>
            <li>
              <Link
                to="/chairperson/reports"
                className={`px-4 py-3 rounded ${activeRoute === "chairperson.reports" ? "bg-seThird text-white" : "hover:bg-seThird"}`}>
                Reports
              </Link>
            </li>

            {/* Notification and user area */}
            <div className="flex items-center ml-2 space-x-3">
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => setShowNotifDropdown((s) => !s)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-seThird"
                  aria-label="Notifications"
                >
                  {/* Simple bell icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 8C18 5.23858 15.7614 3 13 3C10.2386 3 8 5.23858 8 8C8 11 6 12 4 13H20C18 12 16 11 16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {showNotifDropdown && (
                  <div className="absolute right-0 mt-2 w-[360px] max-h-[420px] overflow-y-auto bg-gray-50 rounded shadow-lg p-3 z-50">
                    <div className="font-semibold text-lg mb-2">NOTIFICATIONS</div>
                    {notifications.length === 0 && <div className="text-sm text-gray-600">No notifications</div>}
                    {notifications.map((n) => (
                      <a key={n.id} href={n.action_url ?? "#"} className="flex items-start bg-white rounded p-2 mb-2 hover:bg-gray-100">
                        <div className="w-12 h-12 rounded-full bg-yellow-400 text-white flex items-center justify-center mr-3">{n.for?.charAt(0)}</div>
                        <div className="text-sm">
                          <div className="font-semibold">{n.course_code ? `${n.course_code} - ${n.bg_school_year}` : ""}</div>
                          <div className="text-gray-700">{n.message}</div>
                          <div className="text-xs text-gray-400 mt-1">{n.created_at ? new Date(n.created_at).toLocaleString() : ""}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div ref={userRef} className="relative">
                <button
                  onClick={() => setShowUserDropdown((s) => !s)}
                  className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center font-medium"
                  aria-label="User menu"
                >
                  {getInitials(user)}
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-[340px] bg-white rounded shadow-lg p-4 z-50">
                    <div className="flex items-center">
                      <img src="/assets/Sample/syllabease.png" alt="SyllabEase" className="w-[110px] mr-2" />
                      <div className="ml-auto">
                        <a href="/logout" className="text-sm text-yellow-500 hover:underline">Sign out</a>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <div className="w-20 h-20 rounded-full bg-yellow-400 text-white flex items-center justify-center text-3xl mr-3">{getInitials(user)}</div>
                      <div>
                        <div className="font-semibold">{user ? `${user.firstname} ${user.lastname}` : "Guest"}</div>
                        <div className="text-sm text-gray-600">{user?.email}</div>
                        <div className="mt-2">
                          <Link to="/profile/edit" className="text-blue-600 underline">My Profile</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ul>

          {/* Mobile: simple right-side controls when menu collapsed */}
          <div className="md:hidden ml-auto flex items-center space-x-2">
            <button onClick={() => setShowNotifDropdown((s) => !s)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 8C18 5.23858 15.7614 3 13 3C10.2386 3 8 5.23858 8 8C8 11 6 12 4 13H20C18 12 16 11 16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button onClick={() => setShowUserDropdown((s) => !s)} className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center font-medium">
              {getInitials(user)}
            </button>
          </div>
        </nav>
      </div>

      {/* Main content offset so nav doesn't overlap */}
      <main className="mt-[90px]">{/* children/content should be rendered by the parent route */}</main>
    </div>
  );
};

export default ChairpersonNav;
