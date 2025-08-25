import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Example placeholder user data
  const user = {
    initials: "BL",
    firstname: "Bayanihan",
    lastname: "Leader",
    email: "leader@example.com",
  };

  return (
    <div>
      

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-[288px] h-screen pt-[65px] transition-transform bg-blue-600 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto text-white">
          <ul className="space-y-2">
            <li>
              <Link
                to="/bayanihan-leader/home"
                className={`flex items-center p-2 rounded-lg hover:bg-blue-500 ${
                  location.pathname === "/bayanihan-leader/home"
                    ? "bg-blue-500"
                    : ""
                }`}
              >
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/bayanihan-leader/syllabus"
                className={`flex items-center p-2 rounded-lg hover:bg-blue-500 ${
                  location.pathname === "/bayanihan-leader/syllabus"
                    ? "bg-blue-500"
                    : ""
                }`}
              >
                <span className="ms-3">Syllabus</span>
              </Link>
            </li>
            <li>
              <Link
                to="/bayanihan-leader/tos"
                className={`flex items-center p-2 rounded-lg hover:bg-blue-500 ${
                  location.pathname === "/bayanihan-leader/tos"
                    ? "bg-blue-500"
                    : ""
                }`}
              >
                <span className="ms-3">TOS</span>
              </Link>
            </li>
            <li>
              <Link
                to="/bayanihan-leader/memo"
                className={`flex items-center p-2 rounded-lg hover:bg-blue-500 ${
                  location.pathname === "/bayanihan-leader/memo"
                    ? "bg-blue-500"
                    : ""
                }`}
              >
                <span className="ms-3">Memo</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Page Content */}
      <div className="p-4 sm:ml-64 mt-[65px]">
        {/* This will be where children or page content gets rendered */}
      </div>
    </div>
  );
}
