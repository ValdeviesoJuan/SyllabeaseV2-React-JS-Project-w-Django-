import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/auth/login";
import BayanihanLeaderHome from "./views/bayanihan_leader/bayanihan_leader_home";
import BlSyllabus from "./views/bayanihan_leader/bl_syllabus";
import BLTOSPage from "./views/bayanihan_leader/bl_tos";
import BLMemoPage from "./views/bayanihan_leader/bl_memo";
import RolePage from "./views/auth/role";
import BtList from "./views/Admin/Bayanihan/btList";
import BtEdit from "./views/Admin/Bayanihan/btEdit";
import BtCreate from "./views/Admin/Bayanihan/btCreate";
import BGroupCreate from "./views/Admin/Bayanihan/bGroupCreate";
import CollegeList from "./views/Admin/College/collegeList";
import CollegeEdit from "./views/Admin/College/collegeEdit";
import CollegeCreate from "./views/Admin/College/collegeCreate";
import CourseList from "./views/Admin/Course/courseList";
import CourseEdit from "./views/Admin/Course/courseEdit";
import CourseCreate from "./views/Admin/Course/courseCreate";
import CurrList from "./views/Admin/Curriculum/currList";
import CurrEdit from "./views/Admin/Curriculum/currEdit";
import CurrCreate from "./views/Admin/Curriculum/currCreate";
import UserEdit from "./views/Admin/user_edit";
import UserRolesCreate from "./views/Admin/user_roles_create";
import UserRolesEdit from "./views/Admin/user_roles_edit";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/bayanihan-leader/home" element={<BayanihanLeaderHome />} />
        <Route path="/bayanihan-leader/syllabus" element={<BlSyllabus />} /> {/* ✅ syllabus route */}
        <Route path="/tos" element={<BLTOSPage />} />
        <Route path="/memo" element={<BLMemoPage />} />
        <Route path="/role" element={<RolePage />} />
        <Route path="/admin/bayanihan/btlist" element={<BtList />} />
        <Route path="/admin/bayanihan/btedit" element={<BtEdit />} />
        <Route path="/admin/bayanihan/btcreate" element={<BtCreate />} />
        <Route
          path="/admin/bayanihan/bgroupcreate"
          element={<BGroupCreate colleges={[]} />}
        />
        <Route path="/admin/college/list" element={<CollegeList />} />
        <Route path="/admin/college/edit/:id" element={<CollegeEdit />} />
        <Route path="/admin/college/create" element={<CollegeCreate />} />
        <Route path="/admin/course/list" element={<CourseList />} />
        <Route path="/admin/course/edit/:id" element={<CourseEdit />} />
        <Route path="/admin/course/create" element={<CourseCreate />} />
        <Route path="/admin/curriculum/list" element={<CurrList />} />
        <Route path="/admin/curriculum/edit/:id" element={<CurrEdit />} />
        <Route path="/admin/curriculum/create" element={<CurrCreate />} />
        <Route path="/admin/user/edit/:id" element={<UserEdit />} />
        <Route
          path="/admin/user/roles/create/:id"
          element={
            <UserRolesCreate
              userId={""} // TODO: Replace with actual userId, e.g., from useParams
              allRoles={[]} // TODO: Replace with actual roles array
            />
          }
        />
        <Route path="/admin/user/roles/edit/:id" element={<UserRolesEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
