// src/views/dean/DeanHome.tsx

import React, { useState } from "react";
import DeanSidebar from "../layouts/deanSidebar";
import DeanHeader from "../layouts/deanHeader";
import { Button, Table } from "flowbite-react";

interface Department {
  id: number;
  code: string;
  name: string;
  status: "Active" | "Inactive";
}

const mockDepartments: Department[] = [
  { id: 1, code: "CS", name: "Computer Science", status: "Active" },
  { id: 2, code: "MATH", name: "Mathematics", status: "Inactive" },
  { id: 3, code: "ENG", name: "English", status: "Active" },
];

const DeanHome: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [missingSignature, setMissingSignature] = useState(true);

  // Pagination mock
  const [page] = useState(1);
  const [lastPage] = useState(1);

  const handleEdit = (id: number) => {
    alert(`Edit department with ID: ${id} (frontend only)`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="flex">
      {/* Sidebar & header*/}
            <DeanHeader children={undefined} />
            <DeanSidebar />

      {/* Main content */}
      <div
        className="flex-1 p-4 mt-14 min-h-screen"
        style={{
          backgroundImage: 'url(/assets/Wave.png)',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
          backgroundColor: "#EEEEEE",
        }}
      >
        {/* Missing Signature Alert */}
        {missingSignature && (
          <div className="absolute z-50 top-10 left-1/2 transform -translate-x-1/2 w-[700px] p-4 rounded-lg shadow-lg border border-red-500 bg-white text-gray-800">
            <button
              onClick={() => setMissingSignature(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 11-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 11-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pr-6">
              <div className="text-sm font-semibold">
                <strong className="text-red-600">Missing Signature:</strong> You haven't uploaded your signature yet.
              </div>
              <Button
                color="pink"
                className="ml-4 w-[150px] flex items-center justify-center gap-2"
                onClick={() => alert("Go to Profile (frontend only demo)")}
              >
                Go to Profile
              </Button>
            </div>
          </div>
        )}

        {/* White container */}
        <div className="max-w-7xl p-8 bg-white rounded-2xl shadow-lg ml-[288px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-4xl text-[#201B50]">Departments</h2>
            <Button
              color="light"
              onClick={() => alert("Add new Department (frontend only demo)")}
              className="flex items-center gap-2"
            >
              Add new Department
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 shadow-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Edit</th>
                  <th className="px-6 py-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, idx) => (
                  <tr key={dept.id} className={idx % 2 === 0 ? "bg-white" : "bg-[#e9edf7]"}>
                    <td className="px-6 py-2">{dept.code}</td>
                    <td className="px-6 py-2">{dept.name}</td>
                    <td className="px-6 py-2">
                      {dept.status === "Active" ? (
                        <span className="bg-emerald-200 text-emerald-600 border-2 border-emerald-400 rounded-lg text-center px-4 py-1">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-200 text-red-700 border-2 border-red-500 rounded-lg text-center px-4 py-1">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-2">
                      <Button size="sm" color="success" onClick={() => handleEdit(dept.id)}>
                        Edit
                      </Button>
                    </td>
                    <td className="px-6 py-2">
                      <Button size="sm" color="failure" onClick={() => handleDelete(dept.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 text-gray-600 text-sm">
            Page {page} of {lastPage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeanHome;
