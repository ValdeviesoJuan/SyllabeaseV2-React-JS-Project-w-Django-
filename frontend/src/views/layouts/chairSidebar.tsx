import React, { useState } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  RectangleStackIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  TableCellsIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface IconProps {
  className?: string;
}

const IconChevronDown: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

interface SidebarProps {
  activeRoute: string;
  handleRouteChange: (route: string) => void;
}

const ChairSidebar: React.FC<SidebarProps> = ({ activeRoute, handleRouteChange }) => {
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);

  const sidebarItems = [
  { 
    key: "home", 
    label: "Home", 
    icon: () => <HomeIcon className="w-6 h-6 mr-3" />, 
    route: "chairperson.home" 
  },
  {
    key: "program",
    label: "Program",
    icon: () => <AcademicCapIcon className="w-6 h-6 mr-3" />,
    hasDropdown: true,
    children: [
      { key: "outcomes", label: "Outcomes", route: "chairperson.programOutcome" },
      { key: "objectives", label: "Educational Objectives", route: "chairperson.poe" },
    ],
  },
  { 
    key: "curricula", 
    label: "Curricula", 
    icon: () => <RectangleStackIcon className="w-6 h-6 mr-3" />, 
    route: "chairperson.curr" 
  },
  { 
    key: "courses", 
    label: "Courses", 
    icon: () => <BookOpenIcon className="w-6 h-6 mr-3" />, 
    route: "chairperson.course" 
  },
  { 
    key: "syllabus", 
    label: "Syllabus", 
    icon: () => <ClipboardDocumentListIcon className="w-6 h-6 mr-3" />, 
    route: "chairperson.syllabus" 
  },
  { 
    key: "tos", 
    label: "TOS", 
    icon: () => <TableCellsIcon className="w-6 h-6 mr-3" />, 
    route: "chairperson.tos" 
  },
  { 
    key: "memo", 
    label: "Memo", 
    icon: () => <DocumentTextIcon className="w-6 h-6 mr-3" />, 
    route: "chair.memo" 
  },
  { 
    key: "reports", 
    label: "Reports", 
    icon: () => <ChartBarIcon className="w-6 h-6 mr-3" />, 
    route: "chairperson.reports" 
  },
];

  return (
    <div className="fixed left-0 top-10 z-30 h-screen pt-16 w-64 bg-blue-600">
      <div className="h-full bg-blue-600 border-r border-gray-200 overflow-y-auto">
        <div className="flex justify-center mt-6 mb-4">
          <button className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-[#1e57b8] hover:bg-[#1c4fae] transition transform hover:scale-105">
            <UserCircleIcon className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Chairperson</span>
            <ChevronDownIcon className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="px-3 pb-4 mt-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.key}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setProgramDropdownOpen(!programDropdownOpen)}
                      className="flex items-center w-full p-2 text-white rounded-lg hover:bg-blue-500 group"
                    >
                      {item.icon()}
                      <span className="flex-1 text-left">{item.label}</span>
                      <IconChevronDown />
                    </button>
                    {programDropdownOpen && (
                      <ul className="py-2 space-y-2">
                        {item.children?.map((child) => (
                          <li key={child.key}>
                            <button
                              onClick={() => handleRouteChange(child.route)}
                              className={`flex items-center w-full p-2 pl-11 text-white rounded-lg hover:bg-blue-500 ${
                                activeRoute === child.key ? "bg-blue-500" : ""
                              }`}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleRouteChange(item.route || item.key)}
                    className={`flex items-center p-2 w-full text-white rounded-lg hover:bg-blue-500 group ${
                      activeRoute === item.key ? "bg-blue-500" : ""
                    }`}
                  >
                    {item.icon()}
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChairSidebar;
