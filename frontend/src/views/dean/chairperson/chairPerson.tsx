import React, { useState } from "react";
import "../../../index.css";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";

// Mock data for chairpersons
const mockChairs = [
  {
    ur_id: 1,
    firstname: "Juan",
    lastname: "Valdevieso",
    department_code: "CS",
    start_validity: "2024-09-01",
    end_validity: "2025-08-31",
  },
  {
    ur_id: 2,
    firstname: "Maria",
    lastname: "Santos",
    department_code: "MATH",
    start_validity: "2024-09-01",
    end_validity: "2025-08-31",
  },
];

const ChairPerson: React.FC = () => {
  const [chairs, setChairs] = useState(mockChairs);
  const [page] = useState(1);
  const [lastPage] = useState(1);

  const handleEdit = (ur_id: number) => {
    alert(`Edit chairperson with ur_id: ${ur_id} (Frontend only demo)`);
  };

  const handleDelete = (ur_id: number) => {
    if (window.confirm("Are you sure you want to delete this chairperson?")) {
      setChairs(chairs.filter((chair) => chair.ur_id !== ur_id));
    }
  };

  return (
    <div className="flex">
      {/* Sidebar and Header */}
      <DeanSidebar />
      <DeanHeader children={undefined} />

      {/* Main content area */}
      <div
        className="flex-1 p-4 mt-14"
        style={{
          backgroundImage: 'url(/assets/Wave.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          backgroundAttachment: 'fixed',
          backgroundSize: 'contain',
          backgroundColor: '#EEEEEE',
        }}
      >
        {/* White rounded container aligned to right of sidebar */}
        <div className="max-w-full p-8 bg-white rounded-2xl shadow-lg ml-[288px]">

          {/* Inner content */}
          <div className="pt-10 w-full">
            <div className="overflow-hidden">

              {/* Header + Assign button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-4xl text-[#201B50]">Chairperson</h2>
                <button
                  className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out p-2 text-black font-semibold flex items-center gap-2"
                  style={{ background: '#d7ecf9' }}
                  onMouseOver={e => (e.currentTarget.style.background = '#c3dff3')}
                  onMouseOut={e => (e.currentTarget.style.background = '#d7ecf9')}
                  onClick={() => alert('Navigate to create chairperson (Frontend only demo)')}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8v8M8 12h8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                  </svg>
                  Assign a new Chairperson
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto w-full pt-6">
                <table className="w-full mt-6 bg-blue-500 shadow-lg text-sm text-left text-gray-500 rounded-lg">
                  <thead className="text-xs text-white uppercase bg-blue-500">
                    <tr>
                      <th className="px-6 py-3 rounded-tl-lg">Name</th>
                      <th className="px-6 py-3">Department Code</th>
                      <th className="px-6 py-3">Start of Validity</th>
                      <th className="px-6 py-3">End of Validity</th>
                      <th className="px-6 py-3">Action</th>
                      <th className="px-6 py-3 rounded-tr-lg"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {chairs.map((chair, idx) => (
                      <tr
                        key={chair.ur_id}
                        className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#e9edf7]'} hover:bg-gray-100`}
                      >
                        <td className="px-6 py-4">{chair.lastname}, {chair.firstname}</td>
                        <td className="px-6 py-4">{chair.department_code}</td>
                        <td className="px-6 py-4">{chair.start_validity}</td>
                        <td className="px-6 py-4">{chair.end_validity}</td>
                        <td>
                          <button className="text-green-500 font-medium hover:scale-105" onClick={() => handleEdit(chair.ur_id)}>Edit</button>
                        </td>
                        <td>
                          <button className="text-red-500 font-medium hover:scale-105" onClick={() => handleDelete(chair.ur_id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-6 text-gray-600 text-sm">
                  Page {page} of {lastPage}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairPerson;
