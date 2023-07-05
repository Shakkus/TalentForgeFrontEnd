import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Register";
import DetailCourses from "./Components/DetailCoursesProgramation/DetailCoursesProgramation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/detail" element={<DetailCourses />} />
      </Routes>
    </div>
  );
}

export default App;
