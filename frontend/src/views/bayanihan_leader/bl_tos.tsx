// src/views/bayanihan_leader/BLTOSPage.tsx
import React, { useEffect, useState } from "react";
import BLHeader from "../layouts/bl_header";
import BLSidebar from "../layouts/bl_sidebar";
import { Button } from "flowbite-react";

type Notification = {
  id?: string | number;
  message?: string;
  dismissUrl?: string;
};

type Props = {
  // You can inject initial notification from Django via window.__INITIAL_NOTIF
  initialNotif?: Notification | null;
};

export default function BLTOSPage({ initialNotif = null }: Props) {
  // try to read server-injected data if present (convention)
  const [notif, setNotif] = useState<Notification | null>(() => {
    try {
      const anyWin: any = window as any;
      return anyWin.__INITIAL_NOTIF ?? initialNotif;
    } catch {
      return initialNotif;
    }
  });

  const [showNotif, setShowNotif] = useState<boolean>(() => Boolean(notif && notif.message));

  useEffect(() => {
    setShowNotif(Boolean(notif && notif.message));
  }, [notif]);

  function dismissNotif() {
    // If you later supply a real dismissUrl, this will call it.
    if (notif?.dismissUrl) {
      fetch(notif.dismissUrl, { method: "POST" })
        .then(() => {
          setShowNotif(false);
          setNotif(null);
        })
        .catch(() => {
          // still hide locally on failure; adjust as needed
          setShowNotif(false);
          setNotif(null);
        });
    } else {
      setShowNotif(false);
      setNotif(null);
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background layer (Wave.png should be in public/assets/Wave.png) */}
      <div
        className="fixed inset-0 -z-10 min-h-screen bg-no-repeat bg-top bg-contain"
        style={{ backgroundImage: "url('/assets/Wave.png')" }}
      />

      {/* Header + Sidebar */}
      <BLSidebar />
      <BLHeader />
      

      {/* Floating notification (mimics blade floating-alert) */}
      {showNotif && notif?.message && (
        <div className="fixed top-6 right-6 bg-[#FEF3C7] border-l-4 border-[#F59E0B] text-[#92400E] px-6 py-4 rounded shadow-lg z-50 w-96 flex items-start space-x-3">
          <svg
            className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>

          <div className="flex-1 text-sm font-medium">{notif.message}</div>

          <button
            onClick={dismissNotif}
            className="ml-4 text-sm text-[#92400E] hover:text-[#B45309] font-semibold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page content wrapper - leaves space for header & sidebar */}
      <main className="pl-[288px] pt-[72px] p-6"> 
        {/* pl = sidebar width, pt = header height — adjust to match your layout */}
        <div className="mt-[6%]">
          {/* Create TOS placeholder (replaces <livewire:b-l-create-tos />) */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-4xl">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Create Table of Specifications</h2>
                <Button onClick={() => alert("Open Create TOS modal (placeholder)")}>
                  + Create TOS
                </Button>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <p className="text-sm text-gray-600">
                  This is a frontend placeholder for the Create TOS component. Replace this with your actual implementation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content box (replaces livewire:b-l-tos) */}
        <div className="m-auto pb-12 p-8 bg-white mt-[10px] shadow-lg rounded w-full max-w-6xl">
          <div className="flex justify-center items-center">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden mb-6">
                <div className="font-bold text-4xl text-[#201B50]">Table of Specifications</div>
              </div>

              {/* Placeholder table */}
              <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topics</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y">
                    {/* sample rows */}
                    {[1, 2, 3].map((i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Course {i}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Topic A, Topic B</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">20%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex gap-2">
                            <Button size="xs" color="light" onClick={() => alert("View (placeholder)")}>View</Button>
                            <Button size="xs" color="light" onClick={() => alert("Edit (placeholder)")}>Edit</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* paging / other controls can go here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
