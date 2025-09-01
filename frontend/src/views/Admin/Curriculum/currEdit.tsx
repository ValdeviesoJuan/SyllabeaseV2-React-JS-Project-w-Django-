import React, { useState } from "react";

interface Department {
  department_id: number;
  department_code: string;
}

const CurrEdit: React.FC = () => {
  // Mock departments (replace later with Django API call)
  const departments: Department[] = [
    { department_id: 1, department_code: "CS" },
    { department_id: 2, department_code: "IT" },
    { department_id: 3, department_code: "ENG" },
  ];

  // Mock existing curriculum values
  const [departmentId, setDepartmentId] = useState<number>(1);
  const [currCode, setCurrCode] = useState<string>("CURR-2025");
  const [effectivity, setEffectivity] = useState<string>("2025");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      departmentId,
      currCode,
      effectivity,
    });
    alert("Curriculum updated! (Frontend only, no backend yet)");
  };

  return (
    <div
  className="p-4 flex items-center justify-center min-h-screen bg-gray-100 bg-no-repeat bg-top bg-contain"
  style={{ backgroundImage: "url(/assets/Wave1.png)" }}
>
      <div className="max-w-md w-[500px] p-6 rounded-lg shadow-lg bg-gradient-to-r from-white to-blue-100">
        {/* Logo */}
        <img
          className="w-[240px] m-auto mb-6 mt-4"
          src="/assets/Edit Curriculum.png"
          alt="SyllabEase Logo"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="text-center">
          {/* Department Select */}
          <div className="m-2 mb-6">
            <label
              htmlFor="department_id"
              className="block text-left ml-[6%] font-medium text-gray-700"
            >
              Department
            </label>
            <select
              id="department_id"
              value={departmentId}
              onChange={(e) => setDepartmentId(Number(e.target.value))}
              className="px-1 py-2 w-[340px] border rounded border-gray-400"
              required
            >
              {departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_code}
                </option>
              ))}
            </select>
          </div>

          {/* Curriculum Code */}
          <div className="m-2 mb-6">
            <label
              htmlFor="curr_code"
              className="block text-left ml-[6%] font-medium text-gray-700"
            >
              Curriculum Code
            </label>
            <input
              type="text"
              id="curr_code"
              value={currCode}
              onChange={(e) => setCurrCode(e.target.value)}
              className="px-1 py-2 w-[340px] border rounded h-[35px] border-gray-400"
              required
            />
          </div>

          {/* Effectivity */}
          <div className="m-2 mb-6">
            <label
              htmlFor="effectivity"
              className="block text-left ml-[6%] font-medium text-gray-700"
            >
              Effectivity
            </label>
            <input
              type="text"
              id="effectivity"
              value={effectivity}
              onChange={(e) => setEffectivity(e.target.value)}
              className="px-1 py-2 w-[340px] border rounded h-[35px] border-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-semibold py-2 rounded-lg m-2 mt-4 mb-4 transition-all"
            >
              Update Curriculum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrEdit;
