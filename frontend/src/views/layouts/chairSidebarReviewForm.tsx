import React, { useMemo, useState } from "react";
import { Dropdown } from "flowbite-react";

// --------------------------------------------------------------------
// Types
// --------------------------------------------------------------------
interface NotificationItem {
  id: string | number;
  dataFor?: string; // equivalent to $notification->data['for']
  course_code?: string;
  bg_school_year?: string;
  message?: string;
  created_at?: string; // ISO
  action_url?: string;
}

interface UserInfo {
  firstname?: string;
  lastname?: string;
  email?: string;
}

interface Props {
  children?: React.ReactNode;
  syllId?: string | number;
  notifications?: NotificationItem[];
  user?: UserInfo;
  logoSrc?: string;
}

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// Component
// --------------------------------------------------------------------
export default function ChairSidebarReviewFormLayout({
  children,
  syllId,
  notifications: notificationsProp,
  user: userProp,
  logoSrc = "/assets/Sample/syllabease.png",
}: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const user = useMemo<UserInfo>(() => userProp ?? { firstname: "Jane", lastname: "Doe", email: "jane.doe@example.com" }, [userProp]);

  const notifications = useMemo<NotificationItem[]>(
    () =>
      notificationsProp ?? [
        {
          id: 1,
          dataFor: "CS",
          course_code: "CS101",
          bg_school_year: "2024-2025",
          message: "Syllabus submitted for review.",
          created_at: new Date().toISOString(),
          action_url: "#",
        },
      ],
    [notificationsProp]
  );

  // download link placeholder — replace when backend exists
  const downloadHref = syllId ? `#/download-review-form/${syllId}` : "#";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Top navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white border shadow border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                aria-controls="logo-sidebar"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
              </button>

              <a href="#" className="flex ml-[35px] ms-2 md:me-24">
                <img src={logoSrc} className="h-8 me-3" alt="logo" />
              </a>
            </div>

            <div className="flex items-center">
              {/* Download link (originally: route('downloadReviewForm', $syll_id)) */}
              <div className="mr-3">
                <a href={downloadHref} className="text-sm text-blue-600 underline underline-offset-2">
                  Download svg here
                </a>
              </div>

              {/* Notifications dropdown */}
              <div className="flex items-center ms-3">
                <div className="relative">
                  <button
                    onClick={() => setNotifOpen((v) => !v)}
                    className="flex text-sm bg-white justify-center items-center rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 w-8 h-8"
                    aria-expanded={notifOpen}
                  >
                    <span className="sr-only">Open notifications</span>
                    <div className="w-8 h-8 rounded-full text-white text-sm flex justify-center items-center">
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
                              <div className="bg-yellow-500 rounded-full text-xl font-medium w-12 h-12 px-2 flex items-center justify-center text-white mr-3">{n.dataFor || "U"}</div>
                            </div>
                            <div>
                              <div>
                                <a href={n.action_url || "#"} className="hover:text-blue text-gray-900">
                                  <span className="font-semibold">{n.course_code || "N/A"}-{n.bg_school_year || "N/A"}</span>
                                  {`: ${n.message || "No message provided."}`}
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

                {/* User dropdown */}
                <div className="relative ms-3">
                  <button
                    onClick={() => setUserOpen((v) => !v)}
                    className="flex text-sm bg-yellow-500 justify-center items-center rounded-full w-8 h-8"
                    aria-expanded={userOpen}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 rounded-full text-white text-sm flex justify-center items-center">{initials(user)}</div>
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
                          <div className="text-sm">{user.email}</div>
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

      <div className="p-4 pt-[70px]">{children}</div>
    </div>
  );
}
