import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, CalendarDays, FileText } from "lucide-react";

export default function DeanSidebar() {
  const location = useLocation();

  // helper to check if current route matches
  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-[288px] bg-[#2468d2] text-white p-4 fixed left-0 top-0 h-screen z-50">
        <div className="text-2xl font-bold mb-6 p-4">Syllabease</div>
        <nav className="space-y-2">
          <Link
            to="/bayanihan-leader/home"
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
              isActive("/bayanihan-leader/home")
                ? "bg-blue-900"
                : "hover:bg-blue-700"
            }`}
          >
            <Home size={18} /> Home
          </Link>

          <Link
            to="/bayanihan-leader/syllabus"
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
              isActive("/bayanihan-leader/syllabus")
                ? "bg-blue-900"
                : "hover:bg-blue-700"
            }`}
          >
            <BookOpen size={18} /> Syllabus
          </Link>

          <Link
            to="/tos"
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
              isActive("/tos") ? "bg-blue-900" : "hover:bg-blue-700"
            }`}
          >
            <CalendarDays size={18} /> TOS
          </Link>

          <Link
            to="/memo"
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
              isActive("/memo") ? "bg-blue-900" : "hover:bg-blue-700"
            }`}
          >
            <FileText size={18} /> Memo
          </Link>
        </nav>
      </aside>
    </div>
  );
}
