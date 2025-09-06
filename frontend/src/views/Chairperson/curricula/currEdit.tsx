import React, { useEffect, useState } from "react";
import { Select, TextInput, Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import ChairSidebar from "../../layouts/chairSidebar";
import ChairpersonNav from "../../layouts/chairpersonNav";

interface Department {
  department_id: number;
  department_code: string;
}

interface Curriculum {
  curr_id: number;
  department_id: number;
  curr_code: string;
  effectivity: string;
}

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Notification {
  id: string;
  data: {
    for: string;
    course_code: string;
    bg_school_year: string;
    message: string;
    action_url: string;
  };
  created_at: Date;
}

const mockUser: User = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    data: {
      for: "CS",
      course_code: "CS101",
      bg_school_year: "2024-2025",
      message: "New syllabus submitted for review",
      action_url: "/syllabus/1",
    },
    created_at: new Date("2024-01-15T10:30:00"),
  },
];

const EditCurriculum: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [user] = useState<User>(mockUser);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [activeRoute, setActiveRoute] = useState("home");
  const [curriculum, setCurriculum] = useState<Curriculum>({
    curr_id: 0,
    department_id: 0,
    curr_code: "",
    effectivity: "",
  });
  const [currCode, setCurrCode] = useState("");
  const [effectivity, setEffectivity] = useState("");

  useEffect(() => {
    // Fetch departments
    fetch("/api/departments")
      .then(res => res.json())
      .then(data => setDepartments(data));

    // Fetch curriculum by ID
    fetch(`/api/curricula/${id}`)
      .then(res => res.json())
      .then(data => {
        setCurriculum(data);
        setCurrCode(data.curr_code);
        setEffectivity(data.effectivity);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      curr_id: curriculum.curr_id,
      department_id: curriculum.department_id,
      curr_code: currCode,
      effectivity: effectivity,
    });
    alert("Curriculum update request submitted!");
  };

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-top bg-fixed"
    style={{
        backgroundImage: `url(/assets/Wave.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundColor: "transparent",
        minHeight: "100vh" // ensures it fills the screen
      }}
    > 
      {/* Import Nav + Sidebar */}
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />

      <div className="absolute" style={{
          top: "100px",   // Y-coordinate
          left: "600px",  // X-coordinate
        }}>

          <div className="max-w-md w-[500px] bg-gradient-to-r from-white to-blue-100 p-6 rounded-lg shadow-lg">
            <img className="text-center mt-4 w-[240px] mx-auto mb-6"
              src="/assets/Edit Curriculum.png" alt="SyllabEase Logo" />
            <form onSubmit={handleSubmit}>
              <div className="text-center">
              {/* Department */}
              <div className="m-2 mb-6">
                <label className="block text-left mb-2 font-medium" htmlFor="department_id">
                  Department
                </label>
                <Select
                  id="department_id"
                  value={curriculum.department_id ? curriculum.department_id.toString() : ""}
                  disabled
                  style={{ backgroundColor: "white", color: "black", width: "400px" }} // Increased width
                >
                  {departments.map((dept) => (
                    <option key={dept.department_id} value={dept.department_id}>
                      {dept.department_code}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Curriculum Code */}
              <div className="m-2 mb-6">
                <label className="block text-left mb-2 font-medium" htmlFor="curr_code">
                  Curriculum Code
                </label>
                <TextInput
                  id="curr_code"
                  value={currCode}
                  onChange={(e) => setCurrCode(e.target.value)}
                  required
                  style={{ backgroundColor: "white", color: "black", width: "400px" }} // Increased width
                />
              </div>

              {/* Effectivity */}
              <div className="m-2 mb-6">
                <label className="block text-left mb-2 font-medium" htmlFor="effectivity">
                  Effectivity
                </label>
                <TextInput
                  id="effectivity"
                  value={effectivity}
                  onChange={(e) => setEffectivity(e.target.value)}
                  required
                  style={{ backgroundColor: "white", color: "black", width: "400px" }} // Increased width
                />
              </div>

              {/* Submit */}
              <div className="text-center">
                <Button type="submit" color="blue" className="mt-4 mb-4">
                  Update Curriculum
                </Button>
              </div>
            </div>
            </form>
          </div>

      </div>
    </div>
  );
};

export default EditCurriculum;
