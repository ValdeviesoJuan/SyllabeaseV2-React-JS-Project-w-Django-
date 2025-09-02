import React, { useState } from "react";
import {
  HomeIcon,
  BookOpenIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function DeanSidebar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
  };

  const notifications = [
    {
      id: 1,
      for: "C",
      course_code: "IT-101",
      school_year: "2024-2025",
      message: "New syllabus submitted",
    },
    {
      id: 2,
      for: "M",
      course_code: "ENG-201",
      school_year: "2024-2025",
      message: "Deadline extended",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-[248px] bg-[#2468d2] text-white p-4 fixed left-0 h-screen shadow-lg">
        <div className="text-2xl font-bold mb-6 p-4"></div>

        <nav className="space-y-2">
          {/* Chairperson pill button */}
          <div className="flex justify-center mt-2 mb-4">
            <button className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-[#1e57b8] hover:bg-[#1c4fae] transition transform hover:scale-105">
              <UserCircleIcon className="w-5 h-5 text-white" />
              <span className="text-sm font-medium">Chairperson</span>
              <ChevronDownIcon className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Home */}
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c4fae] transition transform hover:scale-105"
          >
            <div className="p-2 rounded-full bg-white/20 flex-shrink-0">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            Home
          </a>

          {/* Syllabus */}
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c4fae] transition transform hover:scale-105"
          >
            <div className="p-2 rounded-full bg-white/20 flex-shrink-0">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            Syllabus
          </a>

          {/* Deadline */}
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c4fae] transition transform hover:scale-105"
          >
            <div className="p-2 rounded-full bg-white/20 flex-shrink-0">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            Deadline
          </a>

          {/* Reports */}
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c4fae] transition transform hover:scale-105"
          >
            <div className="p-2 rounded-full bg-white/20 flex-shrink-0">
              <ChartBarIcon className="w-5 h-5 text-white" />
            </div>
            Reports
          </a>

          {/* Memo */}
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c4fae] transition transform hover:scale-105"
          >
            <div className="p-2 rounded-full bg-white/20 flex-shrink-0">
              <DocumentIcon className="w-5 h-5 text-white" />
            </div>
            Memo
          </a>

          <div className="border-t border-white/30 my-4"></div>

          {/* Department */}
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c4fae] transition transform hover:scale-105"
          >
            <div className="p-2 rounded-full bg-white/20 flex-shrink-0">
              <BuildingOffice2Icon className="w-5 h-5 text-white" />
            </div>
            Department
          </a>

          {/* Chairperson */}
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c4fae] transition transform hover:scale-105"
          >
            <div className="p-2 rounded-full bg-white/20 flex-shrink-0">
              <UserCircleIcon className="w-5 h-5 text-white" />
            </div>
            Chairperson
          </a>
        </nav>
      </aside>
    </div>
  );
}
