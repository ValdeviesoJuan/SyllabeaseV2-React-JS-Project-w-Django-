import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { Label, TextInput, Select, Button } from "flowbite-react";

type DepartmentForm = {
  college_id: string;
  department_code: string;
  department_name: string;
  program_code: string;
  program_name: string;
  department_status: "Active" | "Inactive";
};

const CreateDepartment: React.FC = () => {
  const [form, setForm] = useState<DepartmentForm>({
    college_id: "",
    department_code: "",
    department_name: "",
    program_code: "",
    program_name: "",
    department_status: "Active",
  });

  const [btnBg, setBtnBg] = useState("#d7ecf9");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Department payload:", form);
    alert("No backend connected yet. Check console for payload.");
  };

  return (
    <div className="flex">
      {/* Sidebar and Header just like in DlList */}
      <DeanSidebar />
      <DeanHeader children={undefined} />

      <div
        className="flex-1 min-h-screen p-4 mt-14"
        style={{
          backgroundImage: 'url("/assets/Wave1.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
          backgroundColor: "#EEEEEE",
        }}
      >
        {/* Main container */}
        <div className="mt-12 flex flex-col items-center pl-52">
          <div
            className="
              max-w-md
              bg-slate-100
              bg-gradient-to-r from-[#FFF] to-[#dbeafe]
              w-[500px]
              p-6
              rounded-lg
              shadow-lg
            "
          >
            <img
              className="edit_user_img text-center mt-4 mb-6 w-[300px] m-auto"
              src="/assets/Create Department.png"
              alt="SyllabEase Logo"
            />

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                id="college_id"
                name="college_id"
                value={form.college_id}
                onChange={() => {}}
              />

              {/* Department Code */}
              <div className="mb-3">
                <Label htmlFor="department_code">Department Code</Label>
                <TextInput
                  id="department_code"
                  name="department_code"
                  value={form.department_code}
                  onChange={handleChange}
                  required
                  className="px-1 py-[6px] w-[380px] border rounded border-gray mt-1"
                />
              </div>

              {/* Department Name */}
              <div className="mb-3">
                <Label htmlFor="department_name">Department Name</Label>
                <TextInput
                  id="department_name"
                  name="department_name"
                  value={form.department_name}
                  onChange={handleChange}
                  required
                  className="px-1 py-[6px] w-[380px] border rounded border-gray mt-1"
                />
              </div>

              {/* Program Code */}
              <div className="mb-3">
                <Label htmlFor="program_code">Program Code</Label>
                <TextInput
                  id="program_code"
                  name="program_code"
                  value={form.program_code}
                  onChange={handleChange}
                  required
                  className="px-1 py-[6px] w-[380px] border rounded border-gray mt-1"
                />
              </div>

              {/* Program Name */}
              <div className="mb-3">
                <Label htmlFor="program_name">Program Name</Label>
                <TextInput
                  id="program_name"
                  name="program_name"
                  value={form.program_name}
                  onChange={handleChange}
                  required
                  className="px-1 py-[6px] w-[380px] border rounded border-gray mt-1"
                />
              </div>

              {/* Status */}
              <div className="mb-3">
                <Label htmlFor="department_status">Status</Label>
                <Select
                  id="department_status"
                  name="department_status"
                  value={form.department_status}
                  onChange={handleChange}
                  required
                  className="px-1 py-[6px] w-[380px] border rounded border-gray mt-1"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="
                    whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out
                    px-6 py-2 text-black font-semibold flex items-center gap-2 m-auto mt-8 mb-4
                  "
                  style={{ background: btnBg }}
                  onMouseEnter={() => setBtnBg("#c3dff3")}
                  onMouseLeave={() => setBtnBg("#d7ecf9")}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="3"
                      width="16"
                      height="18"
                      rx="2"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Create Department
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
