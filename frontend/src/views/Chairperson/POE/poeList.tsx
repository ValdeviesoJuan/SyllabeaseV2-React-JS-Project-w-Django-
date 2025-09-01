// File: Syllabease/frontend/src/views/Chairperson/POE/PoeList.tsx
import React, { useState } from "react";
import { Button, Checkbox } from "flowbite-react";

export type Poe = {
  poe_id: number;
  poe_code: string;
  poe_description: string;
};

const mockPoes: Poe[] = [
  { poe_id: 1, poe_code: "PEO1", poe_description: "Graduates are proficient in the IT field..." },
  { poe_id: 2, poe_code: "PEO2", poe_description: "Graduates can collaborate effectively..." },
  { poe_id: 3, poe_code: "PEO3", poe_description: "Graduates engage in lifelong learning..." },
];

export default function PoeList() {
  const [poes, setPoes] = useState<Poe[]>(mockPoes);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = (id: number) => {
    // Frontend-only delete simulation
    setPoes(prev => prev.filter(p => p.poe_id !== id));
  };

  return (
    <div
      className="mt-14 opacity-80 p-4 pb-10 shadow bg-white border-dashed rounded-lg relative"
      style={{
        backgroundImage: "url(/assets/Wave1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-xl font-semibold flex justify-center pt-5 mb-10">
        Program Educational Objectives
      </h1>

      <div className="space-y-4 ml-20">
        {poes.map((poe) => (
          <div key={poe.poe_id} className="flex items-center gap-2 tracking-wide">
            <p>{poe.poe_code} : {poe.poe_description}</p>
            {showDelete && (
              <Button
                color="failure"
                size="sm"
                onClick={() => handleDelete(poe.poe_id)}
                className="ml-2"
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 ml-10 mt-6">
        <Button
          color="light"
          className="flex items-center gap-2 hover:scale-105 transition"
          onClick={() => alert("Navigate to Create POE")}
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add Program Educational Objective
        </Button>

        <Button
          color="light"
          className="flex items-center gap-2 hover:scale-105 transition"
          onClick={() => alert("Navigate to Edit POE")}
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
            <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit Program Educational Objective
        </Button>

        <div className="flex items-center gap-2">
          <Checkbox
            id="showDelete"
            checked={showDelete}
            onChange={() => setShowDelete(!showDelete)}
          />
          <label htmlFor="showDelete" className="font-semibold">Show Delete Button</label>
        </div>
      </div>
    </div>
  );
}
