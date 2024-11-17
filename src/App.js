import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/Menu";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./components/Login";
import SemesterList from "./components/Semester/SemesterList";
import CourseList from "./components/Course/CourseList";
import CollegeDayList from "./components/CollegeDay/CollegeDayList";
import ClassList from "./components/Class/ClassList";
import LecturerList from "./components/Lecturer/LecturerList";
import StudentList from "./components/Student/StudentList";
import ClassDetail from "./components/Class/ClassDetail";
import CreateClass from "./components/Class/CreateClass";
import UpdateClass from "./components/Class/UpdateClass";
import CreateCourse from "./components/Course/CreateCourse";
import UpdateCourse from "./components/Course/UpdateCourse";
import UpdateSemester from "./components/Semester/UpdateSemester";
import CourseDetail from "./components/Course/CourseDetail";
import CreateSemester from "./components/Semester/CreateSemester";
import SemesterDetail from "./components/Semester/SemesterDetail";
import LecturerDetail from "./components/Lecturer/LecturerDetail";
import CreateLecturer from "./components/Lecturer/CreateLecturer";
import UpdateLecturer from "./components/Lecturer/UpdateLecturer";
import StudentDetail from "./components/Student/StudentDetail";
import CreateStudent from "./components/Student/CreateStudent";
import UpdateStudent from "./components/Student/UpdateStudent";
import CollegeDayDetail from "./components/CollegeDay/CollegeDayDetail";
import CreateCollegeDay from "./components/CollegeDay/CreateCollegeDay";
import UpdateCollegeDay from "./components/CollegeDay/UpdateCollegeDay";

function App() {
    return (
        <div className="App">
            <Menu/>
            <Router>
                <Routes>
                    <Route path={'/'} element={<CollegeDayList/>}/>
                    <Route path={'/login'} element={<Login/>}/>

                    <Route path={'/semesters'} element={<SemesterList/>}/>
                    <Route path={'/semester_detail'} element={<SemesterDetail/>}/>
                    <Route path={'/create_semester'} element={<CreateSemester/>}/>
                    <Route path={'/update_semester'} element={<UpdateSemester/>}/>

                    <Route path={'/courses'} element={<CourseList/>}/>
                    <Route path={'/course_detail'} element={<CourseDetail/>}/>
                    <Route path={'/create_course'} element={<CreateCourse/>}/>
                    <Route path={'/update_course'} element={<UpdateCourse/>}/>

                    <Route path={'/collegedays'} element={<CollegeDayList/>}/>
                    <Route path={'/collegeday_detail'} element={<CollegeDayDetail/>}/>
                    <Route path={'/create_collegeday'} element={<CreateCollegeDay/>}/>
                    <Route path={'/update_collegeday'} element={<UpdateCollegeDay/>}/>

                    <Route path={'/classes'} element={<ClassList/>}/>
                    <Route path={'/class_detail'} element={<ClassDetail/>}/>
                    <Route path={'/create_class'} element={<CreateClass/>}/>
                    <Route path={'/update_class'} element={<UpdateClass/>}/>

                    <Route path={'/lecturers'} element={<LecturerList/>}/>
                    <Route path={'/lecturer_detail'} element={<LecturerDetail/>}/>
                    <Route path={'/create_lecturer'} element={<CreateLecturer/>}/>
                    <Route path={'/update_lecturer'} element={<UpdateLecturer/>}/>

                    <Route path={'/students'} element={<StudentList/>}/>
                    <Route path={'/student_detail'} element={<StudentDetail/>}/>
                    <Route path={'/create_student'} element={<CreateStudent/>}/>
                    <Route path={'/update_student'} element={<UpdateStudent/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
