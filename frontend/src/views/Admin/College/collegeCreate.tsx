import React, { useState } from "react";
import { Button } from "flowbite-react";

const CollegeCreate: React.FC = () => {
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeDescription, setCollegeDescription] = useState("");
  const [collegeStatus, setCollegeStatus] = useState<"Active" | "Inactive">(
    "Active"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🚀 No backend yet — just console log
    console.log({
      college_code: collegeCode,
      college_description: collegeDescription,
      college_status: collegeStatus,
    });
    alert("College created! (Frontend only, no backend yet)");
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
      <div className="max-w-md w-[500px] bg-gradient-to-r from-white to-blue-100 p-6 rounded-lg shadow-lg">
        <img
          className="mt-2 w-[280px] mx-auto mb-4"
          src="/assets/Create College.png"
          alt="SyllabEase Logo"
        />

        <form onSubmit={handleSubmit} className="text-center">
          {/* College Code + Status */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* College Code */}
            <div className="text-left">
              <label htmlFor="college_code" className="block font-medium mb-1">
                College Code
              </label>
              <input
                type="text"
                id="college_code"
                value={collegeCode}
                onChange={(e) => setCollegeCode(e.target.value)}
                className="px-2 py-2 w-full border rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* College Status */}
            <div className="text-left">
              <label htmlFor="college_status" className="block font-medium mb-1">
                Status
              </label>
              <select
                id="college_status"
                value={collegeStatus}
                onChange={(e) =>
                  setCollegeStatus(e.target.value as "Active" | "Inactive")
                }
                className="px-2 py-2 w-full border rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* College Description */}
          <div className="mb-6 text-left">
            <label
              htmlFor="college_description"
              className="block font-medium mb-1"
            >
              College Description
            </label>
            <input
              type="text"
              id="college_description"
              value={collegeDescription}
              onChange={(e) => setCollegeDescription(e.target.value)}
              className="px-2 py-2 w-full border rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 font-semibold rounded-lg mt-4"
            >
              Create College
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeCreate;
