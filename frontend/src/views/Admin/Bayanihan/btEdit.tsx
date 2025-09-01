import React, { useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

const BtEdit: React.FC = () => {
  const [leaders, setLeaders] = useState<Option[]>([]);
  const [members, setMembers] = useState<Option[]>([]);

  // Mock data - replace with API later
  const users: Option[] = [
    { value: "1", label: "Hua, Shua" },
    { value: "2", label: "Ratunil, Josiah Joshua" },
    { value: "3", label: "Hatsu, Baku" },
  ];

  const courses: Option[] = [
    { value: "CS101", label: "CS101" },
    { value: "3333", label: "3333" },
  ];

  const schoolYears: Option[] = [
    { value: "2024-2025", label: "2024-2025" },
    { value: "2025-2026", label: "2025-2026" },
    { value: "2026-2027", label: "2026-2027" },
  ];

  return (
    <div
  className="flex items-center justify-center min-h-screen bg-no-repeat bg-top bg-cover"
  style={{ backgroundImage: `url(/assets/wave1.png)` }}
>
      <div className="max-w-md w-[560px] bg-gradient-to-r from-[#fff] to-[#dbeafe] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Edit <span className="text-yellow-500">Bayanihan Team</span>
        </h1>

        {/* Courses */}
        <div className="mb-4">
          <label className="block mb-1">Courses</label>
          <Select options={courses} />
        </div>

        {/* Bayanihan Leaders */}
        <div className="mb-4">
          <label className="block mb-1">Bayanihan Leaders</label>
          <Select
            options={users}
            isMulti
            value={leaders}
            onChange={(val) => setLeaders(val as Option[])}
          />
        </div>

        {/* Bayanihan Members */}
        <div className="mb-4">
          <label className="block mb-1">Bayanihan Members</label>
          <Select
            options={users}
            isMulti
            value={members}
            onChange={(val) => setMembers(val as Option[])}
          />
        </div>

        {/* School Year */}
        <div className="mb-4">
          <label className="block mb-1">School Year</label>
          <Select options={schoolYears} />
        </div>

        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Update Bayanihan Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default BtEdit;
