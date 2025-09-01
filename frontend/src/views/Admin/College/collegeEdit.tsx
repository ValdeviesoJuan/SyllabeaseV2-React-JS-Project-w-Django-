import React, { useState } from "react";
import { Button } from "flowbite-react";

interface CollegeEditProps {
  college?: {
    college_id: number;
    college_code: string;
    college_description: string;
    college_status: "Active" | "Inactive";
  };
}

const CollegeEdit: React.FC<CollegeEditProps> = ({ college }) => {
  const [collegeCode, setCollegeCode] = useState(college?.college_code || "");
  const [collegeDescription, setCollegeDescription] = useState(
    college?.college_description || ""
  );
  const [collegeStatus, setCollegeStatus] = useState<
    "Active" | "Inactive" | ""
  >(college?.college_status || "Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ⛔️ No backend yet
    console.log({
      college_id: college?.college_id,
      college_code: collegeCode,
      college_description: collegeDescription,
      college_status: collegeStatus,
    });
    alert("College updated! (Frontend only, no backend yet)");
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
      <div className="max-w-md w-[500px] bg-gradient-to-r from-white to-blue-100 p-6 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="text-center"
        >
          <img
            className="mt-4 w-[240px] mx-auto mb-2"
            src="/assets/Edit College.png"
            alt="SyllabEase Logo"
          />

          {/* College Code */}
          <div className="m-2 mt-4 text-left">
            <label htmlFor="college_code" className="block font-medium mb-1">
              College Code
            </label>
            <input
              type="text"
              id="college_code"
              value={collegeCode}
              onChange={(e) => setCollegeCode(e.target.value)}
              className="px-2 py-2 w-full border rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* College Description */}
          <div className="m-2 mt-4 text-left">
            <label htmlFor="college_description" className="block font-medium mb-1">
              College Description
            </label>
            <input
              type="text"
              id="college_description"
              value={collegeDescription}
              onChange={(e) => setCollegeDescription(e.target.value)}
              className="px-2 py-2 w-full border rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* College Status */}
          <div className="m-2 mt-4 text-left">
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
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 font-semibold rounded mt-10 mb-4"
            >
                Update College
            </Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeEdit;
