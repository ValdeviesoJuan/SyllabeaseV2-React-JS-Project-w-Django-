import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { Link } from "react-router-dom";

interface Department {
  department_id: number;
  department_code: string;
  department_name: string;
  department_status: "Active" | "Inactive";
}

const DepartmentHome: React.FC = () => {
  // Mock state for departments (replace with API later)
  const [departments, setDepartments] = useState<Department[]>([
    { department_id: 1, department_code: "CS", department_name: "Computer Science", department_status: "Active" },
    { department_id: 2, department_code: "IT", department_name: "Information Technology", department_status: "Inactive" },
    { department_id: 3, department_code: "ENG", department_name: "Engineering", department_status: "Active" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 3; // Example only

  const handleDelete = (id: number) => {
    setDepartments(departments.filter((d) => d.department_id !== id));
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: "url(/assets/Wave.png)",
        backgroundColor: "#EEEEEE",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <DeanSidebar />
      <div className="flex-1">
        <DeanHeader children={undefined} />

        <div className="max-w-7xl p-8 pb-4 bg-white rounded-2xl shadow-lg ml-[288px] mr-[20px]">
          <div className="flex justify-between items-center mb-2 mt-2">
            <h2 className="font-bold text-3xl text-[#201B50]">Departments</h2>

            <Link
              to="/dean/department/create"
              className="whitespace-nowrap rounded-xl mr-1.5 hover:scale-105 transition ease-in-out p-2 text-black font-semibold flex items-center gap-2"
              style={{ background: "#d7ecf9" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#c3dff3")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#d7ecf9")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8v8M8 12h8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
              </svg>
              Add new Department
            </Link>
          </div>

          <div className="overflow-x-auto w-full pt-6">
            <table className="w-full shadow-lg rounded-lg text-sm mt-12 bg-blue-500 text-left text-gray-500">
              <thead>
                <tr className="bg-blue text-sm text-white">
                  <th className="bg-blue5 rounded-tl-lg px-6 py-3">Code</th>
                  <th className="bg-blue5 px-6 py-3">Name</th>
                  <th className="bg-blue5 px-6 py-3 pl-52">Status</th>
                  <th className="bg-blue5 px-6 py-3"></th>
                  <th className="bg-blue5 rounded-tr-lg px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department, index) => (
                  <tr
                    key={department.department_id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-[#e9edf7]"} hover:bg-gray4`}
                  >
                    <td className="px-6 text-md font-bold">{department.department_code}</td>
                    <td className="px-6 py-4 text-gray-800">{department.department_name}</td>
                   <td className="px-6 py-4">
                    {department.department_status === "Active" ? (
                        <p className="bg-emerald-200 text-emerald-600 border-2 border-emerald-400 rounded-lg text-center px-5 py-[2px] w-fit mx-auto">
                        Active
                        </p>
                    ) : (
                        <p className="bg-red-200 text-red-700 border-2 border-red-400 rounded-lg text-center px-5 py-[2px] w-fit mx-auto">
                        Inactive
                        </p>
                    )}
                    </td>
                    <td>
                      <Link
                        to={`/dean/department/edit/${department.department_id}`}
                        className="text-green font-medium hover:scale-105 mt-3 inline-block"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(department.department_id)}
                        className="text-red font-medium hover:scale-105 mt-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              <div className="flex justify-center">
                <span className="mt-6 text-gray-600 text-sm">
                  Page {currentPage} of {lastPage}
                </span>
              </div>
              {/* Add Prev/Next buttons if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHome;
