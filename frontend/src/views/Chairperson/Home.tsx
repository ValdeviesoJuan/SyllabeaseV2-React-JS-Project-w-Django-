import React from "react";
import ChairSidebarLayout from "../layouts/chairSidebar";

interface Props {
  missingSignature?: boolean;
  // since there's no backend yet, data is mocked. When backend exists, replace with props or fetch calls.
}

// Mock component to replace <livewire:chair-b-teams />
function ChairBTeamsMock() {
  const mockTeams = [
    { id: 1, name: "Team A", members: 5, status: "Active" },
    { id: 2, name: "Team B", members: 3, status: "Pending" },
    { id: 3, name: "Team C", members: 8, status: "Active" },
  ];

  return (
    <div className="space-y-4">
      {mockTeams.map((t) => (
        <div key={t.id} className="p-4 rounded-lg border bg-white shadow-sm flex items-center justify-between">
          <div>
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-500">Members: {t.members} — {t.status}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-sm">View</button>
            <button className="px-3 py-1 rounded-md bg-yellow-50 hover:bg-yellow-100 text-sm">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BayanihanTeams({ missingSignature = false }: Props) {
  return (
    <ChairSidebarLayout>
      {/* Background styling: in Django, serve /static/public/assets/Wave.png or replace path as needed */}
      <div
        className="min-h-screen pt-14"
        style={{
          backgroundImage: "url('/assets/Wave.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
          backgroundColor: "#EEEEEE",
        }}
      >
        {missingSignature && (
          <div className="absolute z-50 top-10 left-1/2 transform -translate-x-1/2 w-[500px] p-4 rounded-lg shadow-lg border border-[#facc15] bg-[#fefce8] text-[#16a34a] flex justify-between items-center">
            <div className="text-sm font-semibold">
              <strong>Missing Signature:</strong> You haven't uploaded your signature yet.
            </div>
            <a href="#/profile/edit" className="ml-4 bg-[#facc15] hover:bg-[#eab308] text-white font-semibold py-1 px-4 rounded-lg transition-all">
              Go to Profile
            </a>
          </div>
        )}

        <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg dark:border-gray-700 mt-14 mx-6">
          <div id="whole">
            {/* Syllabus here (original Blade had Bayanihan Teams content) */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="font-bold text-4xl text-[#201B50]">Bayanihan Teams</h1>

                {/* Original form submitted to route('chairperson.createBTeam') - replaced with client-side link until backend exists */}
                <a href="#/chairperson/create-bteam" className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2" style={{ background: '#d7ecf9' }} onMouseOver={(e) => (e.currentTarget.style.background = '#c3dff3')} onMouseOut={(e) => (e.currentTarget.style.background = '#d7ecf9')}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8v8M8 12h8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                  </svg>
                  Create Bayanihan Team
                </a>
              </div>

              <div>
                {/* livewire replacement: a React component that lists teams */}
                <ChairBTeamsMock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChairSidebarLayout>
  );
}
