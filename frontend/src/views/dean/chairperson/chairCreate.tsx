import React from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";

export default function AssignChair() {
  return (
    
    <div className="flex">
      {/* Sidebar & header*/}
      <DeanHeader children={undefined} />
      <DeanSidebar />

      {/* Main Content */}
      <div className="flex-1 "> 
        <div
          className="min-h-screen flex items-center justify-center bg-no-repeat bg-top bg-contain pl-52"
          style={{ backgroundImage: "url(/assets/Wave1.png)" }}
        >
          <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[500px] p-6 rounded-lg shadow-lg">
            <img
              className="edit_user_img text-center mt-4 mb-6 w-[300px] m-auto"
              src="/assets/Assign Chairperson.png"
              alt="SyllabEase Logo"
            />

            <form>
              {/* Chairperson Dropdown */}
              <div className="mb-6">
                <div>
                  <label htmlFor="user_id">Chairperson</label>
                </div>
                <select
                  name="user_id"
                  id="user_id"
                  className="px-1 py-[6px] w-[400px] border rounded border-gray"
                  required
                >
                  <option value="1">Doe, John</option>
                  <option value="2">Smith, Jane</option>
                  <option value="3">Garcia, Alex</option>
                </select>
              </div>

              {/* Department Dropdown */}
              <div className="mb-6">
                <div>
                  <label htmlFor="department_id">Department</label>
                </div>
                <select
                  name="department_id"
                  id="department_id"
                  className="px-1 py-[6px] w-[400px] border rounded border-black"
                  required
                >
                  <option value="1">Computer Science</option>
                  <option value="2">Information Technology</option>
                  <option value="3">Engineering</option>
                </select>
              </div>

              {/* Validity Dates */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="mb-3">
                  <label htmlFor="start_validity">Start of Validity</label>
                  <input
                    type="date"
                    name="start_validity"
                    id="start_validity"
                    className="px-1 py-[6px] w-[190px] border rounded h-[38px] border-[#a3a3a3]"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="end_validity">End of Validity</label>
                  <input
                    type="date"
                    name="end_validity"
                    id="end_validity"
                    className="px-1 py-[6px] w-[190px] border rounded h-[38px] border-[#a3a3a3]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 m-auto mt-8 mb-4"
                  style={{ background: "#d7ecf9" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#c3dff3")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "#d7ecf9")}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M20 8v6M23 11h-6"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Assign Chair
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
