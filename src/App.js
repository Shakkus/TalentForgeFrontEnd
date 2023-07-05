import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Register";
import DetailCourses from "./Components/DetailCoursesProgramation/DetailCoursesProgramation";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/detail" element={<DetailCourses />} />
        <Route path="/register" element={<Form />} />
        <Route path="/presentation" element={<Landing />} />
      </Routes>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
