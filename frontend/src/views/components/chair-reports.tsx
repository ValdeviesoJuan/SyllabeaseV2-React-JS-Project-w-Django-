import React, { useState } from "react";

const ChairReports: React.FC = () => {
  const syllabiData = [
    {
      id: 1,
      course_title: "Math",
      course_code: "MTH101",
      bg_school_year: "2024-2025",
      course_semester: "1st Semester",
      term: 1,
      version: 1,
      chairStatus: "Approved",
      deanStatus: "For Revision",
    },
  ];

  const tosData = [
    {
      id: 1,
      course_title: "Science",
      course_code: "SCI101",
      bg_school_year: "2024-2025",
      course_semester: "1st Semester",
      tos_term: "Midterm",
      term: 1,
      version: 1,
      chairStatus: "Approved",
    },
  ];

  const [search, setSearch] = useState("");
  const [tosSearch, setTosSearch] = useState("");

  return (
    <div
      className="absolute p-6 space-y-10"
      style={{
        top: "80px",
        left: "280px",
        right: "20px",
      }}
    >
      <style>{`
        body {
          background-image: url('/assets/Wave.png');
          background-repeat: no-repeat;
          background-position: top;
          background-attachment: fixed;
          background-size: cover;
          background-color: transparent;
        }
      `}</style>

      {/* Cards Section */}
        <div className="flex justify-center gap-6 flex-wrap">
        {[
            { title: "Submitted Syllabus", value: "0/0" },
            { title: "Submitted Midterm TOS", value: "0/0" },
            { title: "Submitted Final TOS", value: "0/0" },
        ].map((card, index) => (
            <div
            key={index}
            className="w-[280px] flex items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            >
            <div className="m-5 bg-blue2 w-fit h-content rounded-full">
                <svg
                fill="#2262c6"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <g>
                    <path d="M17.44,2.065H6.56a2.507,2.507,0,0,0-2.5,2.5v14.87a2.507,2.507,0,0,0,2.5,2.5H17.44a2.5,2.5,0,0,0,2.5-2.5V4.565A2.5,2.5,0,0,0,17.44,2.065Zm1.5,17.37a1.5,1.5,0,0,1-1.5,1.5H6.56a1.5,1.5,0,0,1-1.5-1.5V6.505H18.94Z" />
                    <g>
                    <path d="M7.549,9.506a.5.5,0,0,1,0-1h8.909a.5.5,0,0,1,0,1Z" />
                    <path d="M7.549,12.506a.5.5,0,0,1,0-1h6.5a.5.5,0,0,1,0,1Z" />
                    <path d="M7.566,18.374a.5.5,0,1,1,0-1h3.251a.5.5,0,0,1,0,1Z" />
                    </g>
                </g>
                </svg>
            </div>
            <div>
                <div className="text-3xl font-semibold text-blue-600">
                {card.value}
                </div>
                <div className="text-gray-600">{card.title}</div>
            </div>
            </div>
        ))}
        </div>

        <div className="px-6">
        <div className="flex flex-col items-center">
            {/* Syllabus Section */}
            <div className="w-[80%] mb-12"> {/* Added mb-12 for extra spacing */}
            <div className="flex py-4 ml-[10%] m-auto text-2xl font-semibold">
                Syllabus
            </div>
            <div className="flex ml-[10%] mb-5">
                <div className="relative w-[30%] min-w-0">
                <input
                    id="search"
                    type="text"
                    className="border focus:outline-none focus:border-blue-500 border-black w-full rounded-lg p-2 pr-10"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>

                <select className="border focus:outline-none focus:border-blue cursor-pointer rounded-lg p-1 w-[17%] ml-6">
                <option value="">Semester (All)</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="Mid Year">Mid Year</option>
                </select>
                <select className="border focus:outline-none focus:border-blue cursor-pointer rounded-lg p-1 w-[18%] ml-6">
                <option value="">School Year (All)</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
                <option value="2027-2028">2027-2028</option>
                <option value="2028-2029">2028-2029</option>
                <option value="2029-2030">2029-2030</option>
                </select>
                <button className="bg-blue ml-2 focus:outline-none focus:border-blue cursor-pointer rounded-lg text-black px-3 p-[4px] ">
                Apply Filters
                </button>
            </div>

            <table className="w-full bg-white border">
                <thead className="bg-blue-600 text-white">
                <tr>
                    <th>Bayanihan Teams</th>
                    <th>School Year</th>
                    <th>Semester</th>
                    <th>Term</th>
                    <th>Draft</th>
                    <th>Chair</th>
                </tr>
                </thead>
                <tbody>
                {syllabiData.length > 0 ? (
                    syllabiData.map((s) => (
                    <tr key={s.id} className="border">
                        <td>{s.course_title}-{s.course_code}</td>
                        <td>{s.bg_school_year}</td>
                        <td>{s.course_semester}</td>
                        <td>{s.term}</td>
                        <td>Version {s.version}</td>
                        <td>{s.chairStatus}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={6} className="text-center py-6">
                        No records found.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>

            {/* Table of Specification Section */}
            <div className="w-[80%] mt-12">
                <div className="flex ml-[10%] text-2xl py-4 font-semibold">
            Table of Specification
        </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex ml-[10%] mb-5">
                <div className="relative w-[30%] min-w-0">
                    <input
                    type="text"
                    className="border focus:outline-none focus:border-blue-500 border-black w-full rounded-lg p-2 pr-10"
                    placeholder="Search..."
                    value={tosSearch}
                    onChange={(e) => setTosSearch(e.target.value)}
                    />
                </div>

                <select className="border focus:outline-none focus:border-blue cursor-pointer rounded-lg p-1 w-[17%] ml-6">
                    <option value="">Semester (All)</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="Mid Year">Mid Year</option>
                </select>

                <select className="border focus:outline-none focus:border-blue cursor-pointer rounded-lg p-1 w-[18%] ml-6">
                    <option value="">School Year (All)</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                    <option value="2027-2028">2027-2028</option>
                    <option value="2028-2029">2028-2029</option>
                    <option value="2029-2030">2029-2030</option>
                </select>

                <button className="bg-blue ml-2 focus:outline-none focus:border-blue cursor-pointer rounded-lg text-black px-3 p-[4px]">
                    Apply Filters
                </button>
                </div>
            </div>

            <table className="w-full bg-white border">
                <thead className="bg-blue-600 text-white">
                <tr>
                    <th>Bayanihan Teams</th>
                    <th>School Year</th>
                    <th>Semester</th>
                    <th>Term</th>
                    <th>Draft</th>
                    <th>Chair</th>
                </tr>
                </thead>
                <tbody>
                {tosData.length > 0 ? (
                    tosData.map((t) => (
                    <tr key={t.id} className="border">
                        <td>{t.course_title}-{t.course_code}</td>
                        <td>{t.bg_school_year}</td>
                        <td>{t.course_semester}</td>
                        <td>{t.tos_term}</td>
                        <td>Version {t.version}</td>
                        <td>{t.chairStatus}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={6} className="text-center py-6">
                        No records found.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>

    </div>
  );
};

export default ChairReports;