import React from "react";
import { Button } from "flowbite-react";
import Select from "react-select";

interface Props {
  missingSignature?: boolean; // optional, default false
}

const Home: React.FC<Props> = ({ missingSignature = false }) => {
  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "#c3dff3";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "#d7ecf9";
  };

  // Example dropdown options for searchable select
  const options = [
    { value: "team1", label: "Team 1" },
    { value: "team2", label: "Team 2" },
    { value: "team3", label: "Team 3" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-top bg-fixed"
      style={{ backgroundImage: "url(/assets/Wave.png)" }}
    >
      {/* Missing Signature Alert */}
      {missingSignature && (
        <div className="absolute z-50 top-10 left-1/2 transform -translate-x-1/2 w-[500px] p-4 rounded-lg shadow-lg border border-yellow-400 bg-yellow-50 text-green-600 flex justify-between items-center">
          <div className="text-sm font-semibold">
            <strong>Missing Signature:</strong> You haven't uploaded your signature yet.
          </div>
          <a
            href="/profile/edit"
            className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-4 rounded-lg transition-all"
          >
            Go to Profile
          </a>
        </div>
      )}

      {/* Main Container */}
      <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg mt-14">
        <div id="whole">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-4xl text-[#201B50]">Bayanihan Teams</h1>
            <form action="/chairperson/createBTeam" method="GET">
              <Button
                type="submit"
                className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2"
                style={{ background: "#d7ecf9" }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8v8M8 12h8"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                </svg>
                Create Bayanihan Team
              </Button>
            </form>
          </div>

          {/* Example Select (replaces Select2 searchable select) */}
          <div className="mb-6 w-1/3">
            <Select options={options} placeholder="Select a team..." />
          </div>

          {/* Placeholder for Livewire component */}
          <div id="chair-b-teams">
            {/* Replace this div with React rendering from backend API when ready */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
