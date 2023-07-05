import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Register";
import DetailCourses from "./Components/DetailCoursesProgramation/DetailCoursesProgramation";
import SearchBar from "./Components/SearchBar/SearchBar";
import Footer from "./Components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/detail" element={<DetailCourses />} />
        <Route path="/register" element={<Form />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
