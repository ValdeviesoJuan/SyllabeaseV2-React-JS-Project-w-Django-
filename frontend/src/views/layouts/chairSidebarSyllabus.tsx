import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Dropdown } from "flowbite-react";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
export interface SyllabusVersion {
  syll_id: string | number;
  version: string | number;
  status?: string;
}

export interface NotificationItem {
  id: string | number;
  forLabel?: string;
  course_code?: string;
  bg_school_year?: string;
  message?: string;
  created_at?: string; // ISO
  action_url?: string;
}

export interface UserInfo {
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface ChairSidebarSyllabusProps {
  children?: ReactNode;
  activeRouteName?:
    | "chairperson.home"
    | "chairperson.programOutcome"
    | "chairperson.poe"
    | "chairperson.curr"
    | "chairperson.course"
    | "chairperson.syllabus"
    | "chairperson.tos"
    | "chair.memo"
    | "chairperson.reports"
    | "chairperson.viewSyllabus";
  syllId?: string | number; // used for generate/download links
  syllabusVersions?: SyllabusVersion[];
  notifications?: NotificationItem[];
  user?: UserInfo;
  logoSrc?: string;
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
const initials = (u?: UserInfo) => `${(u?.firstname?.[0] || "").toUpperCase()}${(u?.lastname?.[0] || "").toUpperCase()}`;
const formatDate = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(undefined, {
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

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------
export default function ChairSidebarSyllabusLayout({
  children,
  activeRouteName = "chairperson.syllabus",
  syllId,
  syllabusVersions: syllabusVersionsProp,
  notifications: notificationsProp,
  user: userProp,
  logoSrc = "/assets/Sample/syllabease.png",
}: ChairSidebarSyllabusProps) {
  // local UI state for dropdown toggles when not using Flowbite JS
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const user = useMemo<UserInfo>(() => userProp ?? { firstname: "Jane", lastname: "Doe", email: "jane.doe@example.com" }, [userProp]);

  const notifications = useMemo<NotificationItem[]>(() => notificationsProp ?? [
    {
      id: 1,
      forLabel: "CS",
      course_code: "CS101",
      bg_school_year: "2024-2025",
      message: "Syllabus submitted for review.",
      created_at: new Date().toISOString(),
      action_url: "#",
    },
  ], [notificationsProp]);

  const syllabusVersions = useMemo<SyllabusVersion[]>(() => syllabusVersionsProp ?? [
    { syll_id: "1", version: 1, status: "Published" },
    { syll_id: "2", version: 2, status: "Draft" },
  ], [syllabusVersionsProp]);

  const activeMatches = (route: string) => route === activeRouteName;

  const generateHref = syllId ? `#/generate-syllabus/${syllId}` : "#";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Top nav */}
      <nav className="fixed top-0 z-50 w-full bg-white border shadow border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                aria-controls="logo-sidebar"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
              >
                <svg className="w-6 h-6" aria-hidden viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
              </button>

              <a href="#" className="flex ml-[35px] ms-2 md:me-24">
                <img src={logoSrc} className="h-8 me-3" alt="SyllabEase" />
              </a>
            </div>

            <div className="flex items-center">
              {/* Generate / Download Syllabus PDF placeholder */}
              <div className="me-2">
                <a href={generateHref} className="inline-flex items-center p-2 rounded-full hover:bg-gray-100" title="Generate Syllabus PDF">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#2468d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Versions dropdown (custom) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setVersionsOpen((v) => !v)}
                  className="inline-flex items-center p-2 rounded-full hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#2468d2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                  </div>
                </button>

                {versionsOpen && (
                  <div className="absolute right-0 mt-2 w-[320px] z-50 bg-[#f3f4f6] rounded shadow p-2">
                    <div className="font-semibold text-lg my-2">Versions</div>
                    <div className="space-y-2">
                      {syllabusVersions.map((sv) => {
                        const isCurrent = activeRouteName === "chairperson.viewSyllabus" && String(syllId) === String(sv.syll_id);
                        return (
                          <a key={sv.syll_id} href={`#/view-syllabus/${sv.syll_id}`} className={`block p-2 rounded hover:bg-blue-100 ${isCurrent ? "bg-blue-200" : "bg-white"}`}>
                            <div className="flex justify-between items-center">
                              <div>Version {sv.version}</div>
                              <div className="text-gray-500 text-sm italic pr-5">{sv.status || "-"}</div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="flex items-center ms-3">
                <div className="relative">
                  <button
                    onClick={() => setNotifOpen((v) => !v)}
                    className="inline-flex items-center p-2 rounded-full hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <svg width="25" height="25" viewBox="-1.5 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#2468d2">
                          <path d="M7.75 17a1 1 0 1 0 2 0h-2Z" />
                          <path d="M14.938 14H3.063a1 1 0 0 1-.938-1.36c.172-.47.312-.977.312-1.64V8c0-3.553 2.516-5.525 5.312-5.921V1a1 1 0 1 1 2 0v1.079C12.547 2.475 15.062 4.447 15.062 8v3c0 .663.14 1.17.312 1.64A1 1 0 0 1 14.938 14Z" />
                        </g>
                      </svg>
                    </div>
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-[400px] max-h-[500px] overflow-y-auto bg-[#f3f4f6] rounded shadow z-50 p-3 text-base">
                      <div className="font-semibold text-lg my-2">NOTIFICATION</div>
                      <div className="space-y-3">
                        {notifications.map((n) => (
                          <div key={n.id} className="flex items-center bg-white mb-3 cursor-pointer px-2 py-2 hover:bg-gray-100 shadow rounded">
                            <div className="pr-1">
                              <div className="bg-yellow-500 rounded-full text-xl font-medium w-12 h-12 px-2 flex items-center justify-center text-white mr-3">{n.forLabel || "U"}</div>
                            </div>
                            <div>
                              <div>
                                <a href={n.action_url || "#"} className="hover:text-blue text-gray-900">
                                  <span className="font-semibold">{n.course_code || "N/A"}-{n.bg_school_year || "N/A"}</span>: {n.message}
                                </a>
                              </div>
                              <div className="text-gray-500 text-sm pt-1">{formatDate(n.created_at)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center ms-3">
                <div className="relative">
                  <button
                    onClick={() => setUserOpen((v) => !v)}
                    className="inline-flex items-center p-2 rounded-full bg-yellow-500 text-white"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">{initials(user)}</div>
                  </button>

                  {userOpen && (
                    <div className="absolute right-0 mt-2 w-[350px] z-50 bg-white rounded shadow-xl px-4 py-2 text-base">
                      <div className="flex flex-row items-center justify-between">
                        <img className="w-[125px]" src={logoSrc} alt="SyllabEase" />
                        <div className="text-sm text-yellow-500">
                          <a href="#" className="hover:underline">Sign out</a>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-row mb-[20px]">
                        <div className="bg-yellow-500 rounded-full w-[80px] h-[80px] flex items-center justify-center mr-3">
                          <div className="text-white text-3xl tracking-widest">{initials(user)}</div>
                        </div>

                        <div>
                          <div className="font-semibold text-lg">{user.firstname} {user.lastname}</div>
                          <div>{user.email}</div>
                          <div className="text-blue-600 underline underline-offset-4"><a href="#">My Profile</a></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-[65px] transition-transform -translate-x-full bg-blue-700 border border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="flex justify-center mb-[40px]">
          <div className="border-2 border-white rounded-full text-white ml-2 w-min">
            <button className="flex p-0.5 relative items-center">
              <div className="bg-white rounded-full">
                <svg fill="#1148b1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100">
                  <path d="M44,63.3c0-3.4,1.1-7.2,2.9-10.2c2.1-3.7,4.5-5.2,6.4-8c3.1-4.6,3.7-11.2,1.7-16.2c-2-5.1-6.7-8.1-12.2-8 s-10,3.5-11.7,8.6c-2,5.6-1.1,12.4,3.4,16.6c1.9,1.7,3.6,4.5,2.6,7.1c-0.9,2.5-3.9,3.6-6,4.6c-4.9,2.1-10.7,5.1-11.7,10.9 c-1,4.7,2.2,9.6,7.4,9.6h21.2c1,0,1.6-1.2,1-2C45.8,72.7,44,68.1,44,63.3z M64,48.3c-8.2,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15 S72.3,48.3,64,48.3z M66.6,64.7c-0.4,0-0.9-0.1-1.2-0.2l-5.7,5.7c-0.4,0.4-0.9,0.5-1.2,0.5c-0.5,0-0.9-0.1-1.2-0.5 c-0.6-0.6-0.6-1.7,0-2.5l5.7-5.7c-0.1-0.4-0.2-0.7-0.2-1.2c-0.2-2.6,1.9-5,4.5-5c0.4,0,0.9,0.1,1.2,0.2c0.2,0,0.2,0.2,0.1,0.4 L66,58.9c-0.2,0.1-0.2,0.5,0,0.6l1.7,1.7c0.2,0.2,0.5,0.2,0.7,0l2.5-2.5c0.1-0.1,0.4-0.1,0.4,0.1c0.1,0.4,0.2,0.9,0.2,1.2 C71.6,62.8,69.4,64.9,66.6,64.7z" />
                </svg>
              </div>
              <div className="mx-1 text-[13px]"><a href="#">Chairperson</a></div>
              <div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-700 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a href="#" className={`${activeMatches("chairperson.home") ? "bg-blue-500" : ""} flex items-center p-2 text-white rounded-lg hover:bg-blue-500`}>
                <svg className="w-6 h-5" fill="#ffffff" viewBox="0 0 45.973 45.972" xmlns="http://www.w3.org/2000/svg"><path d="M44.752,20.914L25.935,2.094c-0.781-0.781-1.842-1.22-2.946-1.22c-1.105,0-2.166,0.439-2.947,1.22L1.221,20.914 c-1.191,1.191-1.548,2.968-0.903,4.525c0.646,1.557,2.165,2.557,3.85,2.557h2.404v13.461c0,2.013,1.607,3.642,3.621,3.642h3.203 V32.93c0-0.927,0.766-1.651,1.692-1.651h6.223c0.926,0,1.673,0.725,1.673,1.651v12.168h12.799c2.013,0,3.612-1.629,3.612-3.642 V27.996h2.411c1.685,0,3.204-1,3.85-2.557C46.3,23.882,45.944,22.106,44.752,20.914z" /></svg>
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <button type="button" className="flex items-center w-full p-2 text-base text-white rounded-lg hover:bg-blue-500" onClick={() => { /* collapse behavior */ }}>
                <svg className="w-6 h-5" viewBox="0 0 179.53818 179.53818" xmlns="http://www.w3.org/2000/svg"><rect fill="#ffffff" width="179.53818" height="179.53816" rx="23"/><text x="54" y="123" fontFamily="Octarine, sans-serif" fontWeight={700} fontSize="100" fill="#2468d2">P</text></svg>
                <span className="flex-1 ms-3 text-left whitespace-nowrap">Program</span>
                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg>
              </button>
            </li>
            <li>
              <a href="#" className={`${activeMatches("chairperson.curr") ? "bg-blue-500" : ""} flex items-center p-2 text-white rounded-lg hover:bg-blue-500`}>
                <span className="flex-1 ms-3 whitespace-nowrap">Curricula</span>
              </a>
            </li>
            <li>
              <a href="#" className={`${activeMatches("chairperson.course") ? "bg-blue-500" : ""} flex items-center p-2 text-white rounded-lg hover:bg-blue-500`}>
                <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
              </a>
            </li>
          </ul>

          <ul className="pt-4 mt-4 space-y-2 border-t border-white/80">
            <li>
              <a href="#" className={`${activeMatches("chairperson.syllabus") ? "bg-blue-500" : ""} flex items-center p-2 text-white rounded-lg hover:bg-blue-500`}>
                <span className="ms-3">Syllabus</span>
              </a>
            </li>
            <li>
              <a href="#" className={`${activeMatches("chairperson.tos") ? "bg-blue-500" : ""} flex items-center p-2 text-white rounded-lg hover:bg-blue-500`}>
                <span className="ms-3">TOS</span>
              </a>
            </li>
            <li>
              <a href="#" className={`${activeMatches("chair.memo") ? "bg-blue-500" : ""} flex items-center p-2 text-white rounded-lg hover:bg-blue-500`}>
                <span className="ms-3">Memo</span>
              </a>
            </li>
            <li>
              <a href="#" className={`${activeMatches("chairperson.reports") ? "bg-blue-500" : ""} flex items-center p-2 text-white rounded-lg hover:bg-blue-500`}>
                <span className="ms-3">Reports</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content area */}
      <div className="p-4 sm:ml-64 pt-[70px]">{children}</div>
    </div>
  );
}
