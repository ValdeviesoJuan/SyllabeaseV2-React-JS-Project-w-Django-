import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Dropdown } from "flowbite-react";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
interface NotificationItem {
  id: string | number;
  for: string; // initials or label
  course_code: string;
  bg_school_year: string;
  message: string;
  created_at: string; // ISO string
  action_url?: string;
}

interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
}

interface ChairSidebarLayoutProps {
  children?: ReactNode;
  // Optional: pass active route name to highlight (to mimic Blade's request()->route()->getName())
  activeRouteName?:
    | "chairperson.home"
    | "chairperson.programOutcome"
    | "chairperson.poe"
    | "chairperson.curr"
    | "chairperson.course"
    | "chairperson.syllabus"
    | "chairperson.tos"
    | "chair.memo"
    | "chairperson.reports";
  // Optional: inject mock data if you want
  notifications?: NotificationItem[];
  user?: UserInfo;
  logoSrc?: string; // e.g. "/assets/Sample/syllabease.png"
  faviconHref?: string; // e.g. "/assets/Sample/se.png"
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
const formatDateTime = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const getInitials = (firstname: string, lastname: string) =>
  `${(firstname?.[0] || "").toUpperCase()}${(lastname?.[0] || "").toUpperCase()}`;

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------
export default function ChairSidebarLayout(props: ChairSidebarLayoutProps) {
  const {
    children,
    activeRouteName = "chairperson.home",
    notifications: notificationsProp,
    user: userProp,
    logoSrc = "/assets/Sample/syllabease.png",
  } = props;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);

  const user = useMemo<UserInfo>(
    () =>
      userProp ?? {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.com",
      },
    [userProp]
  );

  const notifications = useMemo<NotificationItem[]>(
    () =>
      notificationsProp ?? [
        {
          id: 1,
          for: "CS",
          course_code: "CS101",
          bg_school_year: "2024-2025",
          message: "Syllabus submitted for review.",
          created_at: new Date().toISOString(),
          action_url: "#",
        },
        {
          id: 2,
          for: "IT",
          course_code: "IT210",
          bg_school_year: "2024-2025",
          message: "Deadline updated by Chairperson.",
          created_at: new Date(Date.now() - 3600 * 1000).toISOString(),
          action_url: "#",
        },
      ],
    [notificationsProp]
  );

  const initials = getInitials(user.firstname, user.lastname);

  // Active route helper
  const isActive = (name: ChairSidebarLayoutProps["activeRouteName"]) =>
    activeRouteName === name;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Top Nav */}
      <nav className="fixed top-0 z-50 w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* Mobile burger */}
              <button
                type="button"
                aria-controls="logo-sidebar"
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen((s) => !s)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>

              {/* Logo */}
              <a href="#" className="flex ms-2 md:me-24 ml-[35px]">
                <img src={logoSrc} className="h-8 me-3" alt="SyllabEase Logo" />
              </a>
            </div>

            {/* Right side: notifications + user */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Dropdown
                inline
                renderTrigger={() => (
                  <button
                    type="button"
                    className="flex text-sm bg-white justify-center items-center rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-label="Open notifications"
                  >
                    <div className="w-8 h-8 rounded-full text-white text-sm flex justify-center items-center">
                      {/* Bell Icon */}
                      <svg
                        width="25"
                        height="25"
                        viewBox="-1.5 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="#2468d2">
                          <path d="M7.75 17a1 1 0 1 0 2 0h-2Z" />
                          <path d="M14.938 14H3.063a1 1 0 0 1-.938-1.36c.172-.47.312-.977.312-1.64V8c0-3.553 2.516-5.525 5.312-5.921V1a1 1 0 1 1 2 0v1.079C12.547 2.475 15.062 4.447 15.062 8v3c0 .663.14 1.17.312 1.64A1 1 0 0 1 14.938 14Z" />
                        </g>
                      </svg>
                    </div>
                  </button>
                )}
                className="shadow-lg"
              >
                <div className="max-h-[500px] w-[400px] overflow-y-auto bg-gray-100 p-3 rounded">
                  <div className="font-semibold text-lg my-2">NOTIFICATION</div>
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <a
                        key={n.id}
                        href={n.action_url || "#"}
                        className="flex items-center bg-white px-2 py-2 rounded shadow hover:bg-gray-50"
                      >
                        <div className="pr-1">
                          <div className="bg-yellow-500 rounded-full text-xl font-medium w-12 h-12 px-2 flex items-center justify-center text-white mr-3">
                            <div>{n.for || "User"}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-900">
                            <span className="font-semibold">
                              {n.course_code || "N/A"} - {n.bg_school_year || "N/A"}
                            </span>
                            {": "}
                            {n.message || "No message provided."}
                          </div>
                          <div className="text-gray-500 text-sm pt-1">
                            {formatDateTime(n.created_at)}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Dropdown>

              {/* User menu */}
              <Dropdown
                inline
                label={
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full text-sm flex items-center justify-center">
                    {initials}
                  </div>
                }
                className="shadow-xl"
              >
                <div className="px-4 py-2 flex items-center gap-3">
                  <img src={logoSrc} alt="SyllabEase" className="w-[125px]" />
                  <div className="ml-auto text-sm text-yellow-500">
                    {/* Replace href with your auth/logout handler */}
                    <a className="hover:underline underline-offset-4" href="#">Sign out</a>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-500 rounded-full w-[80px] h-[80px] flex items-center justify-center">
                      <div className="text-white text-3xl tracking-widest">{initials}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        {user.firstname} {user.lastname}
                      </div>
                      <div className="text-sm text-gray-700">{user.email}</div>
                      <div className="text-blue-600 underline underline-offset-4">
                        <a href="#">My Profile</a>
                      </div>
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={
          "fixed top-0 left-0 z-40 w-64 h-screen pt-[65px] transition-transform bg-blue-700 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 " +
          (sidebarOpen ? " translate-x-0" : " -translate-x-full sm:translate-x-0")
        }
        aria-label="Sidebar"
      >
        {/* Header role chip */}
        <div className="flex justify-center mb-10">
          <div className="border-2 border-white rounded-full text-white ml-2 w-min">
            <button className="flex p-0.5 relative items-center">
              <div className="bg-white rounded-full">
                {/* Person Icon */}
                <svg
                  fill="#1148b1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 100 100"
                >
                  <path d="M44,63.3c0-3.4,1.1-7.2,2.9-10.2c2.1-3.7,4.5-5.2,6.4-8c3.1-4.6,3.7-11.2,1.7-16.2c-2-5.1-6.7-8.1-12.2-8 s-10,3.5-11.7,8.6c-2,5.6-1.1,12.4,3.4,16.6c1.9,1.7,3.6,4.5,2.6,7.1c-0.9,2.5-3.9,3.6-6,4.6c-4.9,2.1-10.7,5.1-11.7,10.9 c-1,4.7,2.2,9.6,7.4,9.6h21.2c1,0,1.6-1.2,1-2C45.8,72.7,44,68.1,44,63.3z M64,48.3c-8.2,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15 S72.3,48.3,64,48.3z M66.6,64.7c-0.4,0-0.9-0.1-1.2-0.2l-5.7,5.7c-0.4,0.4-0.9,0.5-1.2,0.5c-0.5,0-0.9-0.1-1.2-0.5 c-0.6-0.6-0.6-1.7,0-2.5l5.7-5.7c-0.1-0.4-0.2-0.7-0.2-1.2c-0.2-2.6,1.9-5,4.5-5c0.4,0,0.9,0.1,1.2,0.2c0.2,0,0.2,0.2,0.1,0.4 L66,58.9c-0.2,0.1-0.2,0.5,0,0.6l1.7,1.7c0.2,0.2,0.5,0.2,0.7,0l2.5-2.5c0.1-0.1,0.4-0.1,0.4,0.1c0.1,0.4,0.2,0.9,0.2,1.2 C71.6,62.8,69.4,64.9,66.6,64.7z" />
                </svg>
              </div>
              <div className="mx-1 text-[13px]">
                <a href="#">Chairperson</a>
              </div>
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 15L12 20L17 15M7 9L12 4L17 9"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-700 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className={
                  (isActive("chairperson.home") ? "bg-blue-500 " : "") +
                  "flex items-center p-2 text-white rounded-lg hover:bg-blue-500"
                }
              >
                {/* Home icon */}
                <svg
                  className="w-6 h-5"
                  fill="#ffffff"
                  viewBox="0 0 45.973 45.972"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M44.752,20.914L25.935,2.094c-0.781-0.781-1.842-1.22-2.946-1.22c-1.105,0-2.166,0.439-2.947,1.22L1.221,20.914 c-1.191,1.191-1.548,2.968-0.903,4.525c0.646,1.557,2.165,2.557,3.85,2.557h2.404v13.461c0,2.013,1.607,3.642,3.621,3.642h3.203 V32.93c0-0.927,0.766-1.651,1.692-1.651h6.223c0.926,0,1.673,0.725,1.673,1.651v12.168h12.799c2.013,0,3.612-1.629,3.612-3.642 V27.996h2.411c1.685,0,3.204-1,3.85-2.557C46.3,23.882,45.944,22.106,44.752,20.914z" />
                </svg>
                <span className="ms-3">Home</span>
              </a>
            </li>

            {/* Program collapse */}
            <li>
              <button
                type="button"
                onClick={() => setProgramOpen((v) => !v)}
                className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg hover:bg-blue-500"
                aria-controls="dropdown-example"
                aria-expanded={programOpen}
              >
                {/* Program P icon box */}
                <svg
                  className="w-6 h-5"
                  viewBox="0 0 179.53818 179.53818"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="#ffffff" width="179.53818" height="179.53816" rx="23" />
                  <text
                    x="54"
                    y="123"
                    fontFamily="Octarine, sans-serif"
                    fontWeight={700}
                    fontSize="100"
                    fill="#2468d2"
                  >
                    P
                  </text>
                </svg>
                <span className="flex-1 ms-3 text-left whitespace-nowrap">Program</span>
                <svg className={`w-3 h-3 transition-transform ${programOpen ? "rotate-180" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul id="dropdown-example" className={(programOpen ? "block" : "hidden") + " py-2 space-y-2"}>
                <li>
                  <a
                    href="#"
                    className={
                      (isActive("chairperson.programOutcome") ? "bg-blue-500 " : "") +
                      "flex items-center w-full p-2 text-white rounded-lg pl-11 hover:bg-blue-500"
                    }
                  >
                    Outcomes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={
                      (isActive("chairperson.poe") ? "bg-blue-500 " : "") +
                      "flex items-center w-full p-2 text-white rounded-lg pl-11 hover:bg-blue-500"
                    }
                  >
                    Educational Objectives
                  </a>
                </li>
              </ul>
            </li>

            {/* Curricula */}
            <li>
              <a
                href="#"
                className={
                  (isActive("chairperson.curr") ? "bg-blue-500 " : "") +
                  "flex items-center p-2 text-white rounded-lg hover:bg-blue-500"
                }
              >
                <svg className="w-6 h-5" viewBox="0 0 179.53818 179.53818" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#ffffff" width="121.78" height="125.76" rx="16" />
                  <rect fill="#ffffff" width="121.78" height="125.76" x="57" y="54" rx="16" />
                  <text x="26" y="115" fontFamily="Octarine, sans-serif" fontWeight={700} fontSize="68" fill="#2468d2">Curr</text>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Curricula</span>
              </a>
            </li>

            {/* Courses */}
            <li>
              <a
                href="#"
                className={
                  (isActive("chairperson.course") ? "bg-blue-500 " : "") +
                  "flex items-center p-2 text-white rounded-lg hover:bg-blue-500"
                }
              >
                <svg className="w-6 h-5" viewBox="0 0 179.53818 179.53818" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#ffffff" width="179.53818" height="179.53816" rx="23" />
                  <text x="44" y="125" fontFamily="Octarine, sans-serif" fontWeight={700} fontSize="100" fill="#2468d2">C</text>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
              </a>
            </li>
          </ul>

          <ul className="pt-4 mt-4 space-y-2 border-t border-white/80">
            {/* Syllabus */}
            <li>
              <a
                href="#"
                className={
                  (isActive("chairperson.syllabus") ? "bg-blue-500 " : "") +
                  "flex items-center p-2 text-white rounded-lg hover:bg-blue-500"
                }
              >
                <svg className="w-6 h-5" viewBox="0 0 31.867 31.867" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                  <path d="M24.963,2.609C24.963,1.168,23.795,0,22.356,0H4.421C3.038,0,1.917,1.121,1.917,2.504v21.762 c0,1.441,1.168,2.609,2.609,2.609h17.827c1.441,0,2.609-1.168,2.609-2.609L24.963,2.609L24.963,2.609z M22.364,22.294 c0,1.095-0.889,1.983-1.983,1.983H6.498c-1.095,0-1.983-0.889-1.983-1.983V4.514c0-1.095,0.888-1.983,1.983-1.983h13.883 c1.094,0,1.981,0.888,1.981,1.983L22.364,22.294L22.364,22.294z" />
                  <path d="M25.989,4.993v2.599c0.791,0,1.435,0.643,1.435,1.435v18.875c0,0.792-0.644,1.435-1.435,1.435H10.876 c-0.755,0-1.368-0.612-1.368-1.368H6.977v1.289c0,1.441,1.168,2.609,2.609,2.609h17.757c1.439,0,2.607-1.169,2.607-2.609V7.602 c0-1.441-1.168-2.609-2.607-2.609H25.989z" />
                  <path d="M7.799,8.411H19.31c0.707,0,1.279-0.558,1.279-1.265S20.017,5.88,19.31,5.88H7.799c-0.707,0-1.279,0.559-1.279,1.266 C6.521,7.853,7.092,8.411,7.799,8.411z" />
                  <path d="M7.799,12.651H19.31c0.707,0,1.279-0.561,1.279-1.265c0-0.707-0.572-1.265-1.279-1.265H7.799 c-0.707,0-1.279,0.558-1.279,1.265C6.521,12.09,7.092,12.651,7.799,12.651z" />
                  <path d="M7.799,16.891H19.31c0.707,0,1.279-0.56,1.279-1.265c0-0.706-0.572-1.265-1.279-1.265H7.799 c-0.707,0-1.279,0.559-1.279,1.265C6.521,16.331,7.092,16.891,7.799,16.891z" />
                  <path d="M7.799,20.994H19.31c0.707,0,1.279-0.559,1.279-1.266c0-0.705-0.572-1.267-1.279-1.267H7.799 c-0.707,0-1.279,0.562-1.279,1.267C6.521,20.436,7.092,20.994,7.799,20.994z" />
                </svg>
                <span className="ms-3">Syllabus</span>
              </a>
            </li>

            {/* TOS */}
            <li>
              <a
                href="#"
                className={
                  (isActive("chairperson.tos") ? "bg-blue-500 " : "") +
                  "flex items-center p-2 text-white rounded-lg hover:bg-blue-500"
                }
              >
                <svg className="w-6 h-5" viewBox="0 0 179.53818 179.53818" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#ffffff" width="179.53818" height="179.53816" rx="23" />
                  <text x="25" y="120" fontFamily="Octarine, sans-serif" fontWeight={700} fontSize="80" fill="#2468d2">TOS</text>
                </svg>
                <span className="ms-3">TOS</span>
              </a>
            </li>

            {/* Memo */}
            <li>
              <a
                href="#"
                className={
                  (isActive("chair.memo") ? "bg-blue-500 " : "") +
                  "flex items-center p-2 text-white rounded-lg hover:bg-blue-500"
                }
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4C4 2.895 4.895 2 6 2H14L20 8V20C20 21.105 19.105 22 18 22H6C4.895 22 4 21.105 4 20V4Z" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M14 2V8H20" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
                <span className="ms-3">Memo</span>
              </a>
            </li>

            {/* Reports */}
            <li>
              <a
                href="#"
                className={
                  (isActive("chairperson.reports") ? "bg-blue-500 " : "") +
                  "flex items-center p-2 text-white rounded-lg hover:bg-blue-500"
                }
              >
                <svg className="w-5 h-5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                  <rect x="15" y="20" width="2" height="4" />
                  <rect x="20" y="18" width="2" height="6" />
                  <rect x="10" y="14" width="2" height="10" />
                  <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z" />
                </svg>
                <span className="ms-3">Reports</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="p-4 sm:ml-64 pt-[70px]">{children}</main>
    </div>
  );
}
