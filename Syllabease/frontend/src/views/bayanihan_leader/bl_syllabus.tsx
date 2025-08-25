import React, { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

// ------------------ Types ------------------
interface SyllabusVersion {
  syll_id: string | number;
  version: number | string;
  status: string;
}

interface Person {
  id: string | number;
  firstname: string;
  lastname: string;
  email: string;
  role: "Leader" | "Member";
}

interface UserProfile {
  firstname: string;
  lastname: string;
  email: string;
}

interface LayoutProps {
  syllabusId?: string | number;
  syllabusVersions?: SyllabusVersion[];
  leaders?: Person[];
  members?: Person[];
  user?: UserProfile;
}

// ------------------ Helpers ------------------
const initials = (first = "", last = "") =>
  `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();

const classNames = (...v: Array<string | false | undefined>) => v.filter(Boolean).join(" ");

// ------------------ Component ------------------
export default function SyllabEaseLayout({
  syllabusId = 1,
  syllabusVersions = [
    { syll_id: 1, version: 1, status: "Draft" },
    { syll_id: 2, version: 2, status: "For Review" },
    { syll_id: 3, version: 3, status: "Approved" },
  ],
  leaders = [
    { id: 1, firstname: "Bayanihan", lastname: "Leader", email: "leader@example.com", role: "Leader" },
  ],
  members = [
    { id: 2, firstname: "Alex", lastname: "Cruz", email: "alex@example.com", role: "Member" },
    { id: 3, firstname: "Jamie", lastname: "Santos", email: "jamie@example.com", role: "Member" },
  ],
  user = { firstname: "Bayanihan", lastname: "Leader", email: "leader@example.com" },
}: LayoutProps) {
  const location = useLocation();

  // Map route -> mode UI label (adjust to your real routes)
  const mode = useMemo(() => {
    const map: Record<string, { label: string; icon: "edit" | "comment" }> = {
      "/bayanihan-leader/syllabus/view": { label: "Editing Mode", icon: "edit" },
      "/bayanihan-leader/syllabus/comment": { label: "Comment Mode", icon: "comment" },
    };
    return (
      map[location.pathname] || { label: "Editing Mode", icon: "edit" }
    );
  }, [location.pathname]);

  return (
    <div className="box-border">
      {/* Top Nav */}
      <div className="fixed top-0 z-50 w-full" id="nav">
        <nav className="w-screen flex px-6 items-center relative bg-blue-600 py-1 shadow-md">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center">
            <img
              className="w-48 md:py-0 py-4"
              src="/assets/Sample/syllabease4.png"
              alt="SyllabEase"
            />
          </Link>

          {/* Quick role chip */}
          <div className="border-2 border-white rounded-full text-white ml-2">
            <button className="flex p-0.5 items-center gap-1">
              <div className="bg-white rounded-full p-0.5">
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
              <span className="text-[13px] mr-1">
                <Link to="/bayanihan-leader/home">B Leader</Link>
              </span>
            </button>
          </div>

          {/* Right controls */}
          <div id="cm" className="ml-auto flex items-center space-x-2">
            {/* History */}
            <Link
              to={`/bayanihan-leader/syllabus/${syllabusId}/history`}
              className="hover:bg-blue-500/40 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <svg width="25" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5.67541V3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3V7C1 8.10457 1.89543 9 3 9H7C7.55229 9 8 8.55229 8 8C8 7.44772 7.55229 7 7 7H4.52186C4.54218 6.97505 4.56157 6.94914 4.57995 6.92229C5.621 5.40094 7.11009 4.22911 8.85191 3.57803C10.9074 2.80968 13.173 2.8196 15.2217 3.6059C17.2704 4.3922 18.9608 5.90061 19.9745 7.8469C20.9881 9.79319 21.2549 12.043 20.7247 14.1724C20.1945 16.3018 18.9039 18.1638 17.0959 19.4075C15.288 20.6513 13.0876 21.1909 10.9094 20.9247C8.73119 20.6586 6.72551 19.605 5.27028 17.9625C4.03713 16.5706 3.27139 14.8374 3.06527 13.0055C3.00352 12.4566 2.55674 12.0079 2.00446 12.0084C1.45217 12.0088 0.995668 12.4579 1.04626 13.0078C1.25994 15.3309 2.2082 17.5356 3.76666 19.2946C5.54703 21.3041 8.00084 22.5931 10.6657 22.9188C13.3306 23.2444 16.0226 22.5842 18.2345 21.0626C20.4464 19.541 22.0254 17.263 22.6741 14.6578C23.3228 12.0526 22.9963 9.30013 21.7562 6.91897C20.5161 4.53782 18.448 2.69239 15.9415 1.73041C13.4351 0.768419 10.6633 0.756291 8.14853 1.69631C6.06062 2.47676 4.26953 3.86881 3 5.67541Z" fill="#ffffff" />
                <path d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2344 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.546 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z" fill="#ffffff" />
              </svg>
            </Link>

            {/* Version dropdown */}
            <Dropdown
              label=""
              dismissOnClick
              renderTrigger={() => (
                <button className="hover:bg-blue-500/40 rounded-full w-8 h-8 flex items-center justify-center">
                  <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.2451,14.75 C21.18,15.3637 21.1371,16.7868 20.1165,17.3263 L12.9348,21.1225 C12.35,21.4316 11.6503,21.4316 11.0655,21.1225 L3.88381,17.3263 C2.86325,16.7868 2.82034,15.3638 3.75508,14.75 L3.817995,14.7892 L3.817995,14.7892 L11.0654,18.6222 C11.6502,18.9313 12.35,18.9313 12.9347,18.6222 L20.1164,14.826 C20.1612,14.8023 20.2041,14.7769 20.2451,14.75 Z M20.2451,10.75 C21.1393522,11.3370174 21.138982,12.6645822 20.2440771,13.2510586 L20.1165,13.3263 L12.9348,17.1225 C12.4031636,17.4035 11.7765686,17.4290455 11.227667,17.1991364 L11.0655,17.1225 L3.88381,13.3263 C2.86325,12.7868 2.82034,11.3638 3.75508,10.75 L3.817995,10.7892 L3.817995,10.7892 L11.0654,14.6222 C11.5970364,14.9032 12.223714,14.9287455 12.7725555,14.6988364 L12.9347,14.6222 L20.1164,10.826 C20.1612,10.8023 20.2041,10.7769 20.2451,10.75 Z M12.9347,2.87782 L20.1164,6.67404 C21.1818,7.23718 21.1818,8.76316 20.1164,9.32629 L12.9347,13.1225 C12.35,13.4316 11.6502,13.4316 11.0654,13.1225 L3.88373,9.32629 C2.81838,8.76315 2.81838,7.23718 3.88373,6.67404 L11.0654,2.87782 C11.6502,2.56872 12.35,2.56872 12.9347,2.87782 Z" fill="#ffffff" />
                  </svg>
                </button>
              )}
            >
              <DropdownHeader>Syllabus Versions</DropdownHeader>
              <div className="max-h-80 overflow-auto pr-1">
                {syllabusVersions.map((v) => {
                  const isActive = String(v.syll_id) === String(syllabusId);
                  return (
                    <Link key={v.syll_id} to={`/bayanihan-leader/syllabus/${v.syll_id}`}>
                      <div
                        className={classNames(
                          "p-2 flex justify-between rounded hover:bg-blue-100",
                          isActive ? "bg-blue-50" : "bg-white"
                        )}
                      >
                        <div className="flex">Version {v.version}</div>
                        <div className="text-gray-500 text-sm italic pr-5">{v.status}</div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            // Frontend only: you can hook this up later
                            alert("Delete clicked (wire this up to backend later)");
                          }}
                          className="p-1"
                          aria-label="delete version"
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11V17" stroke="#454545" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 11V17" stroke="#454545" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 7H20" stroke="#454545" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#454545" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#454545" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Dropdown>

            {/* Comment/Edit mode dropdown */}
            <Dropdown
              label=""
              dismissOnClick
              renderTrigger={() => (
                <button
                  id="modeButton"
                  className="hover:bg-blue-500/40 bg-blue-500 rounded-full cursor-pointer px-2 h-8 flex items-center"
                >
                  {mode.icon === "comment" ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#ffffff" />
                    </svg>
                  )}
                  <span id="modeText" className="mx-2 text-white text-sm">{mode.label}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M13.098 8H6.902c-.751 0-1.172.754-.708 1.268L9.292 12.7c.36.399 1.055.399 1.416 0l3.098-3.433C14.27 8.754 13.849 8 13.098 8Z" />
                  </svg>
                </button>
              )}
            >
              <DropdownItem as={Link} to={`/bayanihan-leader/syllabus/${syllabusId}/view`}>
                Edit Mode
              </DropdownItem>
              <DropdownItem as={Link} to={`/bayanihan-leader/syllabus/${syllabusId}/comment`}>
                Comment Mode
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => alert("Export DOCX (hook later)")}>Export as DOCX</DropdownItem>
            </Dropdown>

            {/* Team dropdown */}
            <Dropdown
              label=""
              dismissOnClick
              renderTrigger={() => (
                <button className="hover:bg-blue-500/40 rounded-full w-8 h-8 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 5.54831C10.7255 5.54831 9.69231 6.58817 9.69231 7.87089C9.69231 9.15362 10.7255 10.1935 12 10.1935C13.2745 10.1935 14.3077 9.15362 14.3077 7.87089C14.3077 6.58817 13.2745 5.54831 12 5.54831ZM8.15385 7.87089C8.15385 5.73302 9.87583 3.99992 12 3.99992C14.1242 3.99992 15.8462 5.73302 15.8462 7.87089C15.8462 10.0088 14.1242 11.7419 12 11.7419C9.87583 11.7419 8.15385 10.0088 8.15385 7.87089Z" fill="#ffffff" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.4825 14.8386C8.91318 14.8386 7.64103 16.119 7.64103 17.6984C7.64103 17.7292 7.64361 17.754 7.64706 17.7726C7.64752 17.7751 7.64798 17.7774 7.64844 17.7795C8.05927 18.0084 9.22185 18.4515 12 18.4515C14.7781 18.4515 15.9407 18.0084 16.3516 17.7795C16.352 17.7774 16.3525 17.7751 16.3529 17.7726C16.3564 17.754 16.359 17.7292 16.359 17.6984C16.359 16.119 15.0868 14.8386 13.5175 14.8386H10.4825ZM6.10256 17.6984C6.10256 15.2638 8.06352 13.2902 10.4825 13.2902H13.5175C15.9365 13.2902 17.8974 15.2638 17.8974 17.6984C17.8974 18.1328 17.7512 18.7483 17.17 19.0921C16.4639 19.5098 15.0065 19.9999 12 19.9999C8.99348 19.9999 7.53615 19.5098 6.82998 19.0921C6.24882 18.7483 6.10256 18.1328 6.10256 17.6984Z" fill="#ffffff" />
                  </svg>
                </button>
              )}
            >
              <div className="px-3 py-2">
                <div className="font-semibold tracking-wide text-lg">CC 101 - Intro to Computing</div>
                <div className="font-semibold tracking-wide text-gray-600">1st Sem SY 2024-2025</div>
                <div className="text-gray-500 mt-1">People with access</div>
                {[...leaders, ...members].map((p) => (
                  <div key={p.id} className="mt-2 flex justify-between">
                    <div className="flex flex-row">
                      <div className="border-2 border-gray-200 bg-green-500 rounded-full w-[30px] h-[30px] flex items-center justify-center mr-2 my-auto">
                        <div className="text-white tracking-widest text-xs">
                          {initials(p.firstname, p.lastname)}
                        </div>
                      </div>
                      <div>
                        <div className="flex text-sm md:text-base">
                          {p.firstname} {p.lastname}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">{p.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-gray-500 text-xs md:text-sm italic pr-2">{p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Dropdown>

            {/* Profile dropdown */}
            <Dropdown
              label=""
              dismissOnClick
              renderTrigger={() => (
                <button className="border-2 w-8 h-8 flex items-center justify-center text-white hover:text-blue-100 hover:bg-white/10 rounded-full">
                  <span className="text-white text-sm tracking-widest">
                    {initials(user.firstname, user.lastname)}
                  </span>
                </button>
              )}
            >
              <div className="px-3 pt-2">
                <div className="flex items-start gap-2">
                  <img className="w-[125px]" src="/assets/Sample/syllabease.png" alt="SyllabEase" />
                  <div className="ml-auto text-sm text-yellow-500">
                    <button onClick={() => alert("Sign out (wire later)")} className="hover:underline">Sign out</button>
                  </div>
                </div>

                <div className="mt-3 flex gap-3 items-center">
                  <div className="bg-yellow-500 rounded-full w-[60px] h-[60px] flex items-center justify-center">
                    <div className="text-white text-2xl tracking-widest">
                      {initials(user.firstname, user.lastname)}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-base">{user.firstname} {user.lastname}</div>
                    <div className="text-sm">{user.email}</div>
                    <Link to="/profile" className="text-blue-600 underline">My Profile</Link>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </nav>
      </div>

      {/* Floating back button (left) */}
      <div className="fixed left-4 top-20">
        <Link to="/bayanihan-leader/syllabus" className="inline-flex">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#2563eb" />
          </svg>
        </Link>
      </div>

      {/* Page content */}
      <main className="mt-16 mb-5 px-4">
        {/* This renders whatever child route you place under this layout */}
        <Outlet />
      </main>
    </div>
  );
}
