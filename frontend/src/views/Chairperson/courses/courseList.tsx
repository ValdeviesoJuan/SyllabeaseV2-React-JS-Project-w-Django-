import React from "react";
import { Link } from "react-router-dom";

const CourseList: React.FC = () => {
  // Placeholder data until backend is ready
  // const [courses, setCourses] = useState<Course[]>([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/courses/")
  //     .then(response => setCourses(response.data))
  //     .catch(error => console.error("Error fetching courses:", error));
  // }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/assets/Wave1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        backgroundColor: "#EEEEEE",
      }}
    >
      <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg mt-14">
        <div className="flex justify-center items-center">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-4xl text-[#201B50] mb-0">Courses</h1>
                <Link
                  to="/chairperson/create-course"
                  className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2"
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
                      d="M12 8v8M8 12h8"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                  </svg>
                  Create New Course
                </Link>
              </div>

              {/* Course List Component (Backend Later) */}
              {/* <LivewireChairCourses /> */}

              {/* Table Placeholder */}
              <div className="overflow-x-auto w-full">
                {/* Backend table will be here */}
                {/* Example Static Placeholder Table */}
                <table className="w-full table-auto p-6 text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-blue text-2xl text-white">
                      <th className="px-6 py-3 font-bold uppercase">Code</th>
                      <th className="px-6 py-3 font-bold uppercase">Title</th>
                      <th className="px-6 py-3 font-bold uppercase">Lec Unit</th>
                      <th className="px-6 py-3 font-bold uppercase">Lab Unit</th>
                      <th className="px-6 py-3 font-bold uppercase">Credit Unit</th>
                      <th className="px-6 py-3 font-bold uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-50">
                    <tr>
                      <td className="px-6 py-4 font-bold">CS101</td>
                      <td className="px-6 py-4">Introduction to Programming</td>
                      <td className="px-6 py-4 text-center">3</td>
                      <td className="px-6 py-4 text-center">1</td>
                      <td className="px-6 py-4 text-center">4</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-green-500">
                          Edit
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* Repeat for placeholder rows */}
                  </tbody>
                </table>
              </div>

              {/* Pagination Placeholder */}
              {/* <div className="mt-4">
                <div className="flex justify-center">
                  <span className="text-gray-600 text-sm">
                    Page 1 of 10
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
