import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Register";
import DetailCourses from "./Components/DetailCoursesProgramation/DetailCoursesProgramation";
import SearchBar from "./Components/SearchBar/SearchBar";
import Footer from "./Components/Footer/Footer.jsx";
import CourseResults from "./Components/CourseResults/CourseResults";
import CourseViewer from "./Components/CourseViewer/CourseViewer.jsx";
import CourseForm from "./Components/CourseCreationForm/CourseCreationForm";
import Login from "./Components/Login/Login";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import CourseDetail from "./Components/Course-Detail/CourseDetail";
import TeachersDetail from "./Components/TeachersDetail/teachersDetail";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Routes>
        <Route path="/search" element={<CourseResults />} />
        <Route path="/view/:id" element={<CourseViewer />} />
        <Route path="/detail" element={<DetailCourses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Form />} />
        <Route path="/course/create" element={<CourseForm />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/teacher/:id" element={<TeachersDetail/>}/>
        <Route path="/presentation" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
