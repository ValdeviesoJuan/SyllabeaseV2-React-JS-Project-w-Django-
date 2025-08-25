import React, { useState } from "react";
import {
  Home,
  BookOpen,
  CalendarDays,
  BarChart3,
  FileText,
  Building2,
  User,
  Bell,
  LogOut,
} from "lucide-react";

export default function DeanSidebar() {
  // dummy states
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // dummy user + notifications
  const user = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
  };

  const notifications = [
    { id: 1, for: "C", course_code: "IT-101", school_year: "2024-2025", message: "New syllabus submitted" },
    { id: 2, for: "M", course_code: "ENG-201", school_year: "2024-2025", message: "Deadline extended" },
  ];

  return (
    <div className="flex">
    
      
     {/* Sidebar */}
      <aside className="w-[288px] bg-[#2468d2] text-white p-4 fixed  left-0 h-screen">
        <div className="text-2xl font-bold mb-6 p-4">Syllabease</div>
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap- p-2 rounded bg-blue-700">
            <Home size={18} /> Home
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <BookOpen size={18} /> Syllabus
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <CalendarDays size={18} /> Deadline
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <BarChart3 size={18} /> Reports
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <FileText size={18} /> Memo
          </a>

          <div className="border-t border-gray-700 my-4"></div>

          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <Building2 size={18} /> Department
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <User size={18} /> Chairperson
          </a>
        </nav>
      </aside>
        
      </div>
  );
}
