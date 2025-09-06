import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Pagination } from "flowbite-react";



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

// Available department codes for filtering
const departmentCodes = ["CS", "MATH", "ENG", "BIO"];

const ChairPerson: React.FC = () => {
  // State
  const [chairs, setChairs] = useState(mockChairs);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department_code: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter + Search logic
  const filteredChairs = chairs.filter((chair) => {
    const matchesSearch =
      search === "" ||
      chair.firstname.toLowerCase().includes(search.toLowerCase()) ||
      chair.lastname.toLowerCase().includes(search.toLowerCase());

    const matchesDept =
      filters.department_code === "" ||
      chair.department_code === filters.department_code;

    return matchesSearch && matchesDept;
  });

  // Paginate
  const paginatedChairs = filteredChairs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
  };

  const handleEdit = (ur_id: number) => {
    alert(`Edit chairperson with ur_id: ${ur_id} (Frontend only demo)`);
  };

  const handleDelete = (ur_id: number) => {
    if (window.confirm("Are you sure you want to delete this chairperson?")) {
      setChairs(chairs.filter((chair) => chair.ur_id !== ur_id));
    }
  };

  return (
    
  <div className="flex justify-center items-center min-h-screen mt-16" 
      style={{
        backgroundImage: `url(/assets/Wave.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundColor: "transparent", 
      }}> 
        
        {/* White rounded container aligned to right of sidebar */}
      <div className="max-w-6xl p-8 bg-white rounded-2xl !rounded-2xl shadow-lg w-full" style={{ borderRadius: '0.5rem' }}>

          {/* Header + Assign button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-4xl text-[#201B50]">Chairperson</h2>
            <button
              className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out p-2 text-black font-semibold flex items-center gap-2 bg-[#d7ecf9] hover:bg-[#c3dff3]"
              onClick={() =>
                alert("Navigate to create chairperson (Frontend only demo)")
              }
            >
              <svg
                className="w-5 h-5"
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
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
              Assign a new Chairperson
            </button>
          </div>

          {/* Filters */}
          <form
            className="flex flex-wrap items-center gap-3 mb-4"
            onSubmit={handleApplyFilters}
          >
            <div className="relative w-[20%]">
              <input
                type="text"
                className="border focus:outline-none focus:border-blue border-black w-full rounded p-1 pr-10"
                placeholder="Search by name..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApplyFilters();
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
                tabIndex={-1}
                onClick={() => handleApplyFilters()}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    stroke="#2468d2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <select
              name="department_code"
              className="border cursor-pointer focus:outline-none focus:border-blue rounded p-1 w-[15%]"
              value={filters.department_code}
              onChange={handleFilterChange}
            >
              <option value="">Department (All)</option>
              {departmentCodes.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <Button
              color="blue"
              className="bg-blue5 hover:bg-blue cursor-pointer rounded text-white p-[4px] px-4"
              type="submit"
            >
              Apply Filters
            </Button>
          </form>

          {/* Table */}
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-white uppercase bg-blue-600">
                <tr>
                  <th className="rounded-tl-lg px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Start of Validity</th>
                  <th className="px-6 py-3">End of Validity</th>
                  <th className="rounded-tr-lg px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedChairs.map((chair, idx) => (
                  <tr
                    key={chair.ur_id}
                    className={
                      idx % 2 === 0
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }
                  >
                    <td className="px-6 py-4 font-medium">
                      {chair.lastname}, {chair.firstname}
                    </td>
                    <td className="px-6 py-4">{chair.department_code}</td>
                    <td className="px-6 py-4">{chair.start_validity}</td>
                    <td className="px-6 py-4">{chair.end_validity}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Button
                        color="success"
                        size="xs"
                        onClick={() => handleEdit(chair.ur_id)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="failure"
                        size="xs"
                        onClick={() => handleDelete(chair.ur_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredChairs.length / itemsPerPage)}
                onPageChange={setCurrentPage}
                showIcons
              />
            </div>
          </div>
        </div>
      </div>
      
    
  );
};

export default ChairPerson;
