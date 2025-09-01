import { useState } from "react";
import { Button } from "flowbite-react";

interface College {
  college_id: number;
  college_code: string;
  college_description: string;
}

interface Dean {
  ur_id: number;
  college_code: string;
  firstname: string;
  lastname: string;
  start_validity: string;
  end_validity: string;
}

export default function CollegesAndDeans() {
  // Mock data
  const [colleges] = useState<College[]>([
    { college_id: 1, college_code: "CS", college_description: "College of Science" },
    { college_id: 2, college_code: "ENG", college_description: "College of Engineering" },
  ]);

  const [deans] = useState<Dean[]>([
    {
      ur_id: 1,
      college_code: "CS",
      firstname: "Alice",
      lastname: "Johnson",
      start_validity: "2024-01-01",
      end_validity: "2025-01-01",
    },
    {
      ur_id: 2,
      college_code: "ENG",
      firstname: "Bob",
      lastname: "Smith",
      start_validity: "2024-03-01",
      end_validity: "2025-03-01",
    },
  ]);

  return (
        <div
            className="min-h-screen bg-[#EEEEEE] bg-no-repeat bg-top bg-contain"
            style={{ backgroundImage: 'url(/assets/Wave.png)' }}    
            >
      <div className="container mx-auto px-4 py-12">
        {/* Colleges Section */}
        <div className="p-6 shadow-lg bg-white rounded-lg mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-black">Colleges</h2>
            <Button className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 bg-blue-100 hover:bg-blue-200">
              <svg
                className="w-5 h-5 mr-2"
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
              Create College
            </Button>
          </div>

          <div className="overflow-x-auto rounded-xl">
            <table className="w-full table-auto shadow-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="px-4 py-2 text-left font-bold">Code</th>
                  <th className="px-4 py-2 text-left font-bold">Description</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {colleges.map((college) => (
                  <tr key={college.college_id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 font-bold">{college.college_code}</td>
                    <td className="px-4 py-2">{college.college_description}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex gap-4 justify-center">
                        <button className="text-green-600 font-semibold hover:underline">Edit</button>
                        <button className="text-red-600 font-semibold hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination mock */}
            <div className="mt-6 flex justify-center">
              <span className="text-gray-600 text-sm">Page 1 of 1</span>
            </div>
          </div>
        </div>

        {/* Deans Section */}
        <div className="p-6 shadow-lg bg-white rounded-lg mt-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-black">Dean</h2>
            <Button className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 bg-blue-100 hover:bg-blue-200">
              <svg
                className="w-5 h-5 mr-2"
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
              Assign Dean
            </Button>
          </div>

          <div className="overflow-x-auto rounded-xl">
            <table className="w-full table-auto shadow-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="px-4 py-2 text-left font-bold">Code</th>
                  <th className="px-4 py-2 text-left font-bold">Name</th>
                  <th className="px-4 py-2 text-left font-bold">Start Validity</th>
                  <th className="px-4 py-2 text-left font-bold">End Validity</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {deans.map((dean) => (
                  <tr key={dean.ur_id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 font-bold">{dean.college_code}</td>
                    <td className="px-4 py-2">{`${dean.firstname} ${dean.lastname}`}</td>
                    <td className="px-4 py-2">{dean.start_validity}</td>
                    <td className="px-4 py-2">{dean.end_validity}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex gap-4 justify-center">
                        <button className="text-green-600 font-semibold hover:underline">Edit</button>
                        <button className="text-red-600 font-semibold hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination mock */}
            <div className="mt-6 flex justify-center">
              <span className="text-gray-600 text-sm">Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
