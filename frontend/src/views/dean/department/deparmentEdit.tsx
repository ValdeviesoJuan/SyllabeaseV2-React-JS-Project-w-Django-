import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";

interface Department {
  department_id: number;
  department_code: string;
  department_name: string;
  program_code: string;
  program_name: string;
  department_status: "Active" | "Inactive";
}

const DepartmentEdit: React.FC<{ department?: Department }> = ({ department }) => {
  
  const [formData, setFormData] = useState<Department>(
    department || {
      department_id: 0,
      department_code: "",
      department_name: "",
      program_code: "",
      program_name: "",
      department_status: "Active",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: "url('/assets/Wave1.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <DeanSidebar />
      <div className="flex-1">
        <DeanHeader children={undefined} />
        <div className="flex items-center justify-center pl-52">
          <div className="max-w-md bg-gradient-to-r from-white to-blue-100 w-[500px] p-6 rounded-lg shadow-lg">
            <img
              className="text-center mt-4 mb-6 w-[280px] m-auto"
              src="/assets/Edit Department.png"
              alt="Edit Department"
            />
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2 mr-[25%]">
                <div>
                  <label htmlFor="department_code">Department Code</label>
                  <input
                    name="department_code"
                    id="department_code"
                    className="px-1 py-[6px] w-[100px] border rounded border-gray-300"
                    required
                    value={formData.department_code}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="department_name">Department Name</label>
                  <input
                    name="department_name"
                    id="department_name"
                    className="px-1 py-[6px] w-[230px] border rounded border-gray-300"
                    required
                    value={formData.department_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2 mr-[25%]">
                <div>
                  <label htmlFor="program_code">Program Code</label>
                  <input
                    name="program_code"
                    id="program_code"
                    className="px-1 py-[6px] w-[100px] border rounded border-gray-300"
                    required
                    value={formData.program_code}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="program_name">Program Name</label>
                  <input
                    name="program_name"
                    id="program_name"
                    className="px-1 py-[6px] w-[230px] border rounded border-gray-300"
                    required
                    value={formData.program_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="department_status">Status</label>
                <select
                  name="department_status"
                  id="department_status"
                  className="px-1 py-[6px] w-[100px] border rounded border-gray-300"
                  required
                  value={formData.department_status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="font-semibold text-white px-6 py-2 rounded-lg m-2 mt-2 mb-4 bg-blue-500 hover:bg-blue-600"
                >
                  Update Department
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentEdit;
