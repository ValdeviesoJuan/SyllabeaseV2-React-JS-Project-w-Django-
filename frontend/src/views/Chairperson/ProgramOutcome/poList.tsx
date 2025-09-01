// File: Syllabease/frontend/src/views/Chairperson/ProgramOutcome/PoList.tsx
import React, { useState } from "react";
import { Button } from "flowbite-react";

export type ProgramOutcome = {
  id: number;
  letter: string;
  description: string;
};

type PoListProps = {
  departmentName?: string;
  initialOutcomes?: ProgramOutcome[];
};

export default function PoList({
  departmentName = "Department",
  initialOutcomes = [],
}: PoListProps) {
  const [outcomes, setOutcomes] = useState<ProgramOutcome[]>(
    initialOutcomes.length > 0
      ? initialOutcomes
      : [
          { id: 1, letter: "a", description: "Sample description 1" },
          { id: 2, letter: "b", description: "Sample description 2" },
        ]
  );
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = (id: number) => {
    const filtered = outcomes.filter((po) => po.id !== id);
    setOutcomes(filtered);
  };

  return (
    <div
      className="p-4 pb-10 shadow bg-white border-dashed rounded-lg dark:border-gray-700 mt-14 opacity-80"
      style={{
        backgroundImage: "url(/assets/Wave1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        backgroundSize: "contain",
      }}
    >
      <h1 className="font-semibold text-xl flex justify-center pt-5">
        Program Outcomes
      </h1>

      <p className="ml-5 tracking-wide text-lg mt-5">
        Upon completion of the <span className="font-bold">{departmentName}</span>{" "}
        program, graduates are able to:
      </p>

      <div className="mb-10 pb-10 ml-20 space-y-3">
        {outcomes.map((po) => (
          <div key={po.id} className="flex items-center gap-2">
            <p>
              {po.letter} : {po.description}
            </p>
            {showDelete && (
              <button
                className="inline-flex items-center ml-2 text-red-500"
                onClick={() => handleDelete(po.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="20"
                  height="20"
                >
                  <path d="M 14.984 2.486 A 1 1 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1 1 0 0 0 7.486 5 L 6 5 A 1 1 0 1 0 6 7 L 24 7 A 1 1 0 1 0 24 5 L 22.514 5 A 1 1 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1 1 0 0 0 14.984 2.486 z M 6 9 L 7.793 24.234 C 7.911 25.241 8.763 26 9.777 26 L 20.223 26 C 21.237 26 22.088 25.241 22.207 24.234 L 24 9 L 6 9 z" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="ml-10 mt-2 flex flex-col gap-3">
        <Button
          onClick={() => alert("Navigate to create page when backend ready")}
          className="flex items-center gap-2 bg-[#d7ecf9] hover:bg-[#c3dff3] text-black"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>Add Program Outcome</span>
        </Button>

        <Button
          onClick={() => alert("Navigate to edit page when backend ready")}
          className="flex items-center gap-2 bg-[#d7ecf9] hover:bg-[#c3dff3] text-black"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.28 6.4L11.74 15.94C10.79 16.89 7.97 17.33 7.34 16.7C6.71 16.07 7.14 13.25 8.09 12.3L17.64 2.75C17.88 2.49 18.16 2.29 18.48 2.14C18.8 1.99 19.14 1.92 19.49 1.91C19.83 1.91 20.18 1.97 20.51 2.1C20.83 2.23 21.12 2.42 21.37 2.67C21.61 2.92 21.81 3.21 21.94 3.53C22.07 3.86 22.13 4.21 22.12 4.55C22.11 4.9 22.03 5.25 21.89 5.56C21.74 5.88 21.54 6.17 21.28 6.4Z"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 4H6C4.94 4 3.92 4.42 3.17 5.17C2.42 5.92 2 6.94 2 8V18C2 19.06 2.42 20.08 3.17 20.83C3.92 21.58 4.94 22 6 22H17C19.21 22 20 20.2 20 18V13"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Edit Program Outcome</span>
        </Button>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enableDeleteButton"
            className="rounded-full"
            checked={showDelete}
            onChange={() => setShowDelete(!showDelete)}
          />
          <label htmlFor="enableDeleteButton">Show Delete Button</label>
        </div>
      </div>
    </div>
  );
}
